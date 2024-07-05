import { useSearchParams } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoginComponent from "@/components/LoginComponent";
import SignupComponent from "@/components/SignupComponent";


const Auth = () => {
  const [searchParams] = useSearchParams();

  return (
    <div className="h-screen flex flex-col items-center">
      <div className="w-6/12 flex flex-col items-center">
        <h1 className=" text-3xl sm:text-4xl my-6 font-semibold text-center">
          {searchParams.get("createNew") ? "Hold up! Let's Login first" : "Login | Signup"}
        </h1>
        <Tabs defaultValue="login" className="w-[400px] text-center">
          <TabsList className="w-full grid grid-cols-2 bg-slate-200 ">
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