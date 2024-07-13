import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import ErrorMessage from "./ErrorMessage"
import { useEffect, useState } from "react"
import { BeatLoader } from "react-spinners"
import * as Yup from 'yup'  
import useFetch from "@/Hooks/useFetch"
import { login } from "../db/apiAuth.js"
import { useNavigate, useSearchParams } from "react-router-dom"

const LoginComponent = () => {
    const [errors, setErrors] = useState("");
    const [formData, setFormData] = useState({
        email:"",
        password:"",
    });

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");

    const handleInputChange = (e)=>{
        const {name, value} = e.target;
        setFormData((prevState)=>({
            ...prevState,
            [name]: value,
        }));
    }

    const {data, error, loading,fetchData:fnLogin} = useFetch(login, formData);

    useEffect(()=>{
        console.log(data);
        if(error===null && data){
            navigate(`/dashboard?${longLink ? `createNew=${longLink}`:""}`);
        }
    },[data,error]);

    const handleLogin = async ()=>{
        setErrors([]);
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                .email('Invalid email format')
                .required('Email is required'),
                password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required')
            })
            await schema.validate(formData,{abortEarly:false}); 
            //api call
            await fnLogin();
        } catch (e) {
            const newError = [];
            e?.inner?.forEach((err)=>{
                newError[err.path] = err.message;
            })
            setErrors(newError);
        }
    }
     return (
        <div>
            <Card className="">
                <CardHeader className="text-left">
                    <CardTitle className="text-black">Login</CardTitle>
                    <CardDescription className="text-gray-800">into your exisiting account</CardDescription>
                    {error && <ErrorMessage message={error.message}/>}
                </CardHeader>
                <CardContent className="text-left">
                    <Input 
                        className="border border-slate-600 text-black"
                        name="email" 
                        type="email" 
                        placeholder="Email" 
                        onChange={handleInputChange}/>
                    {errors.email && <ErrorMessage message={errors.email}/> }
                </CardContent>
                <CardContent className="text-left">
                    <Input 
                        className="border border-slate-600 text-black"
                        name="password" 
                        type="password" 
                        placeholder="password" 
                        onChange={handleInputChange} />
                    {errors.password && <ErrorMessage message={errors.password}/> }
                </CardContent>
                <CardFooter>
                    <Button className="bg-slate-600" onClick={handleLogin}>
                        {loading? <BeatLoader size={10} color="#36d7b7" />:"Login"}
                    </Button>
                </CardFooter>
            </Card>

        </div>
    )
}

export default LoginComponent