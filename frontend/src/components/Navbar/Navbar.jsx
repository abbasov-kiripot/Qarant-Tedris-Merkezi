import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";

import scroolTOTop from "../../provider/scroolTOTop";

const Navbar = () => {
  const [menu, setMenu] = useState("Main page");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin") === "true"); // Giriş durumu başlangıçta ayarlanır.

  // Dropdown menüyü açıp kapatma
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Kullanıcının giriş yapıp yapmadığını kontrol eden yardımcı fonksiyon
  const getProfileLink = () => {
    return isLogin ? "/profile" : "/Results"; // Giriş yapılmışsa "/profile", yapılmamışsa "/Results"
  };

  // Kullanıcı menü dışına tıkladığında dropdown'u kapatma
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="Navbar">
      <Link to="/">
        <img src="https://i.ibb.co/hFG0bvF/qarant-logo.jpg" className="logo" alt="logo" />
      </Link>

      <ul className="Navbar-menu">
        <li
          onClick={() => setMenu("Main page")}
          className={menu === "Main page" ? "active" : ""}
        >
          <Link to="/" onClick={scroolTOTop}>Əsas</Link>
        </li>
        <li className="dropdown" onClick={toggleDropdown}>
          <span className={`dropdown-btn ${dropdownOpen ? "active" : ""}`}>
            <Link to="/" onClick={scroolTOTop}>Kurslarımız</Link>
          </span>
          <div className={`dropdown-content ${dropdownOpen ? "show" : ""}`}>
            <Link to="/School" onClick={scroolTOTop}>Ali təhsil müəssisələrinə və Kolleclərə hazırlıq</Link>
            <Link to="/FLT" onClick={scroolTOTop}>Xarici dil hazırlığı</Link>
            <Link to="/SchoolPreparation" onClick={scroolTOTop}>Məktəbə hazırlıq</Link>
            <Link to="/Program" onClick={scroolTOTop}>Ofis programları</Link>
            <Link to="/Tibb" onClick={scroolTOTop}>TİBB</Link>
            <Link to="/MIQ" onClick={scroolTOTop}>MİQ</Link>
          </div>
        </li>
        <li
          onClick={() => setMenu("Vacancies")}
          className={menu === "Vacancies" ? "active" : ""}
        >
          <Link to="/Vacancies" onClick={scroolTOTop}>Vakansiya</Link>
        </li>
        <li
          onClick={() => setMenu("Exam")}
          className={menu === "Exam" ? "active" : ""}
        >
          <Link to="/exam" onClick={scroolTOTop}>Qeydiyyat</Link>
        </li>
        <li
          onClick={() => setMenu("Instructors")}
          className={menu === "Instructors" ? "active" : ""}
        >
          <Link to="/Instructors" onClick={scroolTOTop}>Təlimçilərimiz</Link>
        </li>
        <li
          onClick={() => setMenu("about us")}
          className={menu === "about us" ? "active" : ""}
        >
          <Link to="/AboutUs" onClick={scroolTOTop}>Haqqımızda</Link>
        </li>
        <li
          onClick={() => setMenu("Contact")}
          className={menu === "Contact" ? "active" : ""}
        >
          <Link to="/Contact" onClick={scroolTOTop}>Əlaqə</Link>
        </li>
      </ul>

      <div className="navbar-one flex">
        <div className="left flex">
          <div className="email" aria-label="Email">
            <MdEmail />
            <span>23abasov@gmail.com</span>
          </div>
          <div className="call" aria-label="Phone">
            <FaPhoneAlt />
            <span>+994 77 488 04 49</span>
          </div>
        </div>
        <div className="right flex">
          <div className="twitter" aria-label="Twitter">
            <FaSquareTwitter />
            <span>twitter</span>
          </div>
          <div className="facebook" aria-label="Facebook">
            <FaFacebook />
            <span>facebook</span>
          </div>
          <div className="instagram" aria-label="Instagram">
            <AiFillInstagram />
            <span>instagram</span>
          </div>
        </div>
      </div>
      <Link to={getProfileLink()}>
        <div className="profile-card">
        <AiOutlineUser />
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
