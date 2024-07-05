import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import ErrorMessage from "./ErrorMessage"
import { useState } from "react"
import { BeatLoader } from "react-spinners"
import * as Yup from 'yup'  

const LoginComponent = () => {
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email:"",
        password:"",
    });

    const handleInputChange = (e)=>{
        const {name, value} = e.target;
        setFormData((prevState)=>({
            ...prevState,
            [name]: value,
        }));
    }

    const handleLogin = async ()=>{
        setError([]);
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
        } catch (e) {
            const newError = [];
            e?.inner?.forEach((err)=>{
                newError[err.path] = err.message;
            })
            setError(newError);
        }
    }

    
     return (
        <div>
            <Card>
                <CardHeader className="text-left">
                    <CardTitle className="text-black">Login</CardTitle>
                    <CardDescription className="text-gray-800">into your exisiting account</CardDescription>
                    <ErrorMessage message={"Error"}/>
                </CardHeader>
                <CardContent className="text-left">
                    <Input 
                        className="border border-slate-600 text-black"
                        name="email" 
                        type="email" 
                        placeholder="Email" 
                        onChange={handleInputChange}/>
                    {error.email && <ErrorMessage message={error.email}/> }
                </CardContent>
                <CardContent className="text-left">
                    <Input 
                        className="border border-slate-600 text-black"
                        name="password" 
                        type="password" 
                        placeholder="password" 
                        onChange={handleInputChange} />
                    {error.password && <ErrorMessage message={error.password}/> }
                </CardContent>
                <CardFooter>
                    <Button className="bg-slate-600" onClick={handleLogin}>
                        {true? <BeatLoader size={10} color="#36d7b7" />:"Login"}
                    </Button>
                </CardFooter>
            </Card>

        </div>
    )
}

export default LoginComponent