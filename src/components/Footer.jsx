import { Link } from "react-router-dom"
import Logo from "../snipurl-logo.png";
const Footer = () => {
  return (
    <footer className="text-white flex justify-between sm:px-16 px-6 items-center border-t border-slate-400">
      <Link to="/">
      <span className="flex justify-center items-center ">
        <img src={Logo} className=" w-[50px] h-[40px] mr-2"/>
        <p className=" tracking-wide py-10 text-white font-poppins font-semibold text-[16px] sm:text-[20px]">SNIP | URL </p>
      </span>
      </Link>
      <h3>Copyright Ⓒ 2024 SinpURL. All Rights Reserved.</h3>
    </footer>
  )
}

export default Footer