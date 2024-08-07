import { Link } from "react-router-dom"
import Logo from "../Untitled-design.png";
const Footer = () => {
  return (
    <footer className="bg-[#212121] text-white flex flex-col sm:flex-row justify-between sm:px-16 px-6 items-center border-t border-white">
      <Link to="/">
      <span className="flex justify-center items-center ">
        <img src={Logo} className=" w-[55px] h-[50px] mr-2"/>
        <p className=" tracking-wide py-10 text-white font-poppins font-semibold text-[16px] sm:text-[20px]">SNIP | URL </p>
      </span>
      </Link>
      <h3 className="text-center">Copyright Ⓒ 2024 SinpURL. All Rights Reserved.</h3>
    </footer>
  )
}

export default Footer