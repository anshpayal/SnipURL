import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import ErrorMessage from "./ErrorMessage"
import { useEffect, useState } from "react"
import { BeatLoader } from "react-spinners"
import * as Yup from 'yup'
import useFetch from "@/Hooks/useFetch"
import { login } from "../db/apiAuth.js"
import { useNavigate, useSearchParams } from "react-router-dom"
import { UrlState } from "@/Context"

const LoginComponent = () => {
    const [errors, setErrors] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const { data, error, loading, fetchData: fnLogin } = useFetch(login, formData);
    const { fetchUser } = UrlState();

    useEffect(() => {
        //console.log(data);
        if (error === null && data) {
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
            fetchUser();
        }
    }, [data, error]);



    const handleLogin = async () => {
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
            await schema.validate(formData, { abortEarly: false });
            //api call
            await fnLogin();
        } catch (e) {
            const newError = [];
            e?.inner?.forEach((err) => {
                newError[err.path] = err.message;
            })
            setErrors(newError);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    }
    return (
        <div className="">
            <Card className="flex flex-col gap-y-3 w-full max-w-md bg-[#171717] border border-[#171717] text-white">
                <CardHeader className="text-left">
                    <CardTitle className="text-purple-400 text-3xl font-semibold text-gradient">Login</CardTitle>
                    <CardDescription className="text-gray-300">into your exisiting account</CardDescription>
                    {error && <ErrorMessage message={error.message} />}
                </CardHeader>
                <CardContent className="space-y-4 text-left">
                    <div>
                        <Input
                            className="bg-[#212121] border-gray-600 text-white placeholder-gray-400"
                            name="email"
                            type="email"
                            placeholder="Email"
                            onChange={handleInputChange}
                        />
                        {errors.email && <ErrorMessage message={errors.email} />}
                    </div>
                    <div>
                        <Input
                            className="bg-[#212121] border-gray-600 text-white placeholder-gray-400"
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                        />
                        {errors.password && <ErrorMessage message={errors.password} />}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleLogin}
                    >
                        {loading ? <BeatLoader size={10} color="#ffffff" /> : "Login"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default LoginComponent