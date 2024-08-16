import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import Logo from "../Untitled-design.png";

const Footer = () => {
  return (
    <footer className="bg-[#212121] text-white sm:px-16 px-6 items-center border-t border-white py-6">
      <div className="flex items-center justify-between space-x-6">
        <Link to="/" className="flex items-center">
          <img src={Logo} className="w-[55px] h-[50px] mr-2" alt="Logo" />
          <p className="text-white font-poppins font-semibold text-[16px] sm:text-[20px]">
            SNIP | URL
          </p>
        </Link>

        <div className="flex space-x-6">
          <a href="https://github.com/your-github-profile" target="_blank" rel="noopener noreferrer">
            <Github className="w-6 h-6 hover:text-gray-400 transition-colors duration-200" />
          </a>
          <a href="https://www.linkedin.com/in/your-linkedin-profile" target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-6 h-6 hover:text-gray-400 transition-colors duration-200" />
          </a>
          <a href="https://twitter.com/your-twitter-profile" target="_blank" rel="noopener noreferrer">
            <Twitter className="w-6 h-6 hover:text-gray-400 transition-colors duration-200" />
          </a>
          <a href="mailto:your-email@example.com">
            <Mail className="w-6 h-6 hover:text-gray-400 transition-colors duration-200" />
          </a>
        </div>
      </div>

      <h3 className="text-center mt-4 sm:mt-0">
        Copyright Ⓒ 2024 SnipURL. All Rights Reserved.
      </h3>
    </footer>
  );
};

export default Footer;
