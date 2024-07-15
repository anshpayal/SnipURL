/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect } from "react";
import useFetch from "./Hooks/useFetch";
import { getCurrentUser } from "./db/apiAuth";

const UrlContext = createContext();

const UrlProvider = ({children}) =>{
    const {data:user, loading, fetchData:fetchUser} = useFetch(getCurrentUser);

    const isAuthentiated = user?.role ==="authenticated";

    useEffect(()=>{
        fetchUser();
    },[]);

    return <UrlContext.Provider value={{user,fetchUser,loading,isAuthentiated}}>
        {children}
    </UrlContext.Provider>
}

export const UrlState = ()=>{
    return useContext(UrlContext);
}

export default UrlProvider;