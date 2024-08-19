import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="f-left">
          <address>
            Əliyar Əliyev küçesi 41, <br />
            Neriman Nerimanov m/s yanı <br />
            <a href="tel:+994124802632">(012) 480 26 32</a> <br />
            <a href="mailto:info@zefer.edu.az">info@zefer.edu.az</a> <br />
            <a href="http://www.zefer.edu.az" target="_blank" rel="noopener noreferrer">www.zefer.edu.az</a>
          </address>
          <div className="social-icons">
            <a href="https://www.facebook.com/" target='_blank'><i className="fab fa-facebook-f"></i></a>
            <a href="https://x.com/?lang=tr" target='_blank'><i className="fab fa-twitter"></i></a>
            <a href="https://www.instagram.com/qarant_tedris_merkezi?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target='_blank'><i className="fab fa-instagram"></i></a>
          </div>
        </div>
        <div className="f-center">
          <h3>Sections</h3>
          <ul>
            <li><Link to="/">Our courses</Link></li>
            <li><Link to="/exam">Online Exam</Link></li>
            <li><Link to="/Vacancies">Vacancies</Link></li>
            <li><Link to="/AboutUs" href="#">AboutUs</Link></li>
            <li><Link to="/Contact" href="#">Contact</Link></li>

          </ul>
        </div>
        <div className="f-right">
          <h3>Departments</h3>
          <ul className="branches">
            <li>
              <img src="https://www.zefer.edu.az/frq-content/plugins/branches_x1/entry/20173011110309_59622600.jpeg" alt="İnşaatçılar filialı" />
              <span>İnşaatçılar branch</span>
              <a href="tel:+994124800875">(012) 480-08-75</a>
            </li>
            <li>
              <img src="https://www.zefer.edu.az/frq-content/plugins/branches_x1/entry/20173011110147_23718600.jpeg" alt="Nərimanov filialı" />
              <span>Nərimanov branch</span>
              <a href="tel:+994124802632">(012) 480 26 32</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright ©2020 Victory Courses. All rights reserved</p>
        <p>Prepared by</p>
      </div>
    </footer>
  );
}

export default Footer;
