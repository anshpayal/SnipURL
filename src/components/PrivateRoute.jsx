/* eslint-disable react/prop-types */
import { UrlState } from "@/Context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { BarLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();

    const { isAuthenticated, loading } = UrlState();
    useEffect(() => {
        if (!isAuthenticated && loading === false) navigate("/auth");

    }, [isAuthenticated, loading]);

    if (loading) return <BarLoader width={"100%"} color="#475569 " />
    if (isAuthenticated) return children;
}

export default PrivateRoute;