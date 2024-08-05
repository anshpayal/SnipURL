import { useNavigate, useSearchParams } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoginComponent from "@/components/LoginComponent";
import SignupComponent from "@/components/SignupComponent";
import { UrlState } from "@/Context";
import { useEffect } from "react";


const Auth = () => {
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const navigate = useNavigate();

  const {isAuthenticated, loading} = UrlState();

  useEffect(()=>{
    if(isAuthenticated && !loading){
      navigate(`/dashboard?${longLink ? `createNew=${longLink}`:""}`);
    }
  },[isAuthenticated, loading]);

  return (
    <div className="h-screen flex flex-col items-center">
      <div className=" w-11/12 sm:w-6/12 flex flex-col items-center ">
        <h1 className="text-gradient text-4xl sm:text-5xl py-6 font-semibold text-center">
          {longLink ? "Hold up! Let's Login first" : "Login | Signup"}
        </h1>
        <Tabs defaultValue="login" className=" w-11/12 sm:w-[400px] text-center">
          <TabsList className="w-full grid grid-cols-2 bg-[#171717]">
            <TabsTrigger className="shadow-lg" value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Signup</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginComponent/>
          </TabsContent>
          <TabsContent value="signup">
            <SignupComponent/>
          </TabsContent>
        </Tabs>

      </div>
    </div>
  )
}

export default Auth