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

const Header = () => {
  const navigate = useNavigate();
  const user = true;
  return (
    <header className=" h-[75px] flex items-center justify-between sm:px-16 px-6 ">
      <Link to="/">
      <span className="flex justify-center items-center ">
        <img src={Logo} className=" w-[50px] h-[40px] mr-2"/>
        <p className=" tracking-wide py-10 font-poppins font-semibold text-[16px] sm:text-[20px]">SNIP | URL </p>
      </span>
      </Link>
      <div>
        {
          user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none mt-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-4 sm:mr-0 mr-4">
                <DropdownMenuLabel className="text-black">Ansh Payal</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LinkIcon color="black" className="w-4 h-4 mr-2"/>
                  <span className="text-black">Links</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400">
                  <LogOut color="#ef4444" className="w-4 h-4 mr-2" />
                  <span className="text-red-500">Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (

            <Button className="font-poppins px-10 font-semibold" variant="outline" onClick={() => { navigate("/auth") }}>Login</Button>
          )
        }
      </div>
    </header>
  )
}

export default Header