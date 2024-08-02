import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LinkIcon, LogOut } from "lucide-react"
import Logo from "../snipurl-logo.png";
import { UrlState } from "@/Context"
import useFetch from "@/Hooks/useFetch"
import { logout } from "@/db/apiAuth"
import { BarLoader } from "react-spinners"
import { getInitials } from "@/lib/utils"

const Header = () => {
  const navigate = useNavigate();
  const { user, fetchUser } = UrlState();

  const { loading, fetchData: fnLogout } = useFetch(logout);

  const initials = getInitials(user?.user_metadata?.name);

  return (
    <>
      <header className=" h-[75px] bg-[#212121] flex items-center justify-between sm:px-16 px-6 ">
        <Link to="/">
          <span className="flex justify-center items-center ">
            <img src={Logo} className=" w-[50px] h-[40px] mr-2" />
            <p className=" tracking-wide py-10 font-poppins font-semibold text-[16px] sm:text-[20px]">SNIP | URL </p>
          </span>
        </Link>
        <div>
          {
            user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none mt-2">
                  <Avatar>
                    <AvatarImage src={user?.user_metadata?.profile_pic} className="object-contain" />
                    <AvatarFallback className="text-black">{initials}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-4 sm:mr-0 mr-4">
                  <DropdownMenuLabel className="text-black">{user?.user_metadata?.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/dashboard" className="flex">
                      <LinkIcon color="black" className="w-4 h-4 mr-2" />
                      <span className="text-black"> My Links</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-400">
                    <LogOut color="#ef4444" className="w-4 h-4 mr-2" />
                    <span className="text-red-500" onClick={() => {
                      fnLogout().then(() => {
                        fetchUser();
                        navigate("/")
                      });
                    }}>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (

              <Button className="font-poppins text-black px-10 font-semibold" variant="outline" onClick={() => { navigate("/auth") }}>Login</Button>
            )
          }
        </div>
      </header>
      {loading && <BarLoader width={"100%"} color="#475569" />}
    </>
  )
}

export default Header