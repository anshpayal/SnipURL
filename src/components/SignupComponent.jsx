import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import ErrorMessage from "./ErrorMessage"
import { useEffect, useState } from "react"
import { BeatLoader } from "react-spinners"
import * as Yup from 'yup'  
import useFetch from "@/Hooks/useFetch"
import { signup } from "../db/apiAuth.js"
import { useNavigate, useSearchParams } from "react-router-dom"
import { UrlState } from "@/Context"

const SignupComponent = () => {
    const [errors, setErrors] = useState("");
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:"",
        profile_pic:null
    });

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");

    const handleInputChange = (e)=>{
        const {name, value, files} = e.target;
        setFormData((prevState)=>({
            ...prevState,
            [name]: files?files[0]:value,
        }));
    }

    const {data, error, loading,fetchData:fnSignup} = useFetch(signup, formData);
    const {fetchUser} = UrlState();

    useEffect(()=>{
        //console.log(data);
        if(error===null && data){
            navigate(`/dashboard?${longLink ? `createNew=${longLink}`:""}`);
            fetchUser();
        }
    },[loading,error]);

    const handleSignup = async ()=>{
        setErrors([]);
        try {
            const schema = Yup.object().shape({
                name:Yup.string().required("Name is required"),
                email: Yup.string()
                .email('Invalid email format')
                .required('Email is required'),
                password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
                // profile_pic: Yup.mixed().required("Profile pic is required")
            })
            await schema.validate(formData,{abortEarly:false}); 
            //api call
            await fnSignup();
        } catch (e) {
            const newError = [];
            e?.inner?.forEach((err)=>{
                newError[err.path] = err.message;
            })
            setErrors(newError);
        }
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSignup();
        }
    }
     return (
        <div>
            <Card className="">
                <CardHeader className="text-left">
                    <CardTitle className="text-black">Signup</CardTitle>
                    <CardDescription className="text-gray-800">Create a new account if you haven&rsquo;t already</CardDescription>
                    {error && <ErrorMessage message={error.message}/>}
                </CardHeader>
                <CardContent className="text-left">
                    <Input 
                        className="border border-slate-600 text-black"
                        name="name" 
                        type="text" 
                        placeholder="Enter Full Name" 
                        onChange={handleInputChange}/>
                    {errors.name && <ErrorMessage message={errors.name}/> }
                </CardContent>
                <CardContent className="text-left">
                    <Input 
                        className="border border-slate-600 text-black"
                        name="email" 
                        type="email" 
                        placeholder="Enter Email" 
                        onChange={handleInputChange}/>
                    {errors.email && <ErrorMessage message={errors.email}/> }
                </CardContent>
                <CardContent className="text-left">
                    <Input 
                        className="border border-slate-600 text-black"
                        name="password" 
                        type="password" 
                        placeholder="Enter Password" 
                        onChange={handleInputChange} />
                    {errors.password && <ErrorMessage message={errors.password}/> }
                </CardContent>
                <CardContent className="text-left">
                    <Input 
                        className="border border-slate-600 text-black"
                        name="profile_pic" 
                        type="file" 
                        accept="image/*" 
                        onChange={handleInputChange} />
                    {errors.profile_pic && <ErrorMessage message={errors.profile_pic}/> }
                </CardContent>
                <CardFooter>
                    <Button className="bg-slate-600" onClick={handleSignup} onKeyPress={handleKeyPress} >
                        {loading? <BeatLoader size={10} color="#36d7b7" />:"Create Account"}
                    </Button>
                </CardFooter>
            </Card>

        </div>
    )
}

export default SignupComponent;