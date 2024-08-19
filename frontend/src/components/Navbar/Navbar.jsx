import React, { useState } from "react";
import "./Navbar.css";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { Link } from "react-router-dom";


const Navbar = ({setShowLogin}) => {
  const [menu, setMenu] = useState("Main page");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="Navbar">
      <Link to="/">
        <img src="https://i.pinimg.com/736x/3f/a4/b3/3fa4b39ee840d16ecf922478affcef2d.jpg" className="logo" alt="" />
      </Link>
      <ul className="Navbar-menu">
        <li
          onClick={() => setMenu("Main page")}
          className={menu === "Main page" ? "active" : ""}
        >
          <Link to="">Main page</Link>
        </li>
        <li className="dropdown" onClick={toggleDropdown}>
          <span
            className={`dropdown-btn ${dropdownOpen ? "active" : ""}`}
          >
            <Link to="/">Our courses</Link>
          </span>
          <div className={`dropdown-content ${dropdownOpen ? "show" : ""}`}>
            <Link to="/School">Ali təhsil müəssisələrinə və Kolleclərə hazırlıq</Link>
            <Link to="/FLT">Xarici dil hazırlığı</Link>
            <Link to="/SchoolPreparation">məktəbə hazırlıq</Link>
            <Link to="/Program">Ofis  programları</Link>
            <Link to="/Tibb">TİBB</Link>
            <Link to="/MIQ">MİQ</Link>

          </div>
        </li>
        
        <li
          onClick={() => setMenu("Vacancies")}
          className={menu === "Vacancies" ? "active" : ""}
        >
          <Link to="/Vacancies">Vacancies</Link>
        </li>
        <li
          onClick={() => setMenu("Exam")}
          className={menu === "Exam" ? "active" : ""}
        >
         <Link to="/exam">Online Exam</Link>
        </li>
        <li
          onClick={() => setMenu("about us")}
          className={menu === "about us" ? "active" : ""}
        >
         <Link to="/AboutUs">AboutUs</Link>
        </li>
        <li
          onClick={() => setMenu("Contact")}
          className={menu === "Contact" ? "active" : ""}
        >
          <Link to="/Contact">Contact</Link>
        </li>
      </ul>
    

      <div className="navbar-one flex">
        <div className="left flex">
          <div className="email">
            <MdEmail />
            <span>23abasov@gmail.com</span>
          </div>
          <div className="call">
            <FaPhoneAlt />
            <span>+994 77 488 04 49</span>
          </div>
        </div>
        <div className="right flex">
          <div className="twitter">
            <FaSquareTwitter />
            <span>twitter</span>
          </div>
          <div className="facebook">
            <FaFacebook />
            <span>facebook</span>
          </div>
          <div className="instagram">
          <AiFillInstagram />
          <span>instagram</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
