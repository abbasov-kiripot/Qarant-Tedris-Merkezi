import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Məlumatlarımız</h3>
          <address>
            Əliyar Əliyev küçəsi 41, <br />
            Nəriman Nərimanov m/s yanı <br />
            <a href="tel:+994124802632">(012) 480 26 32</a> <br />
            <a href="mailto:info@zefer.edu.az">info@zefer.edu.az</a> <br />
            <a href="http://www.zefer.edu.az" target="_blank" rel="noopener noreferrer">www.zefer.edu.az</a>
          </address>
        </div>
        
        <div className="footer-section">
          <h3>Sahələr</h3>
          <ul>
            <li><Link to="/exam">Onlayn İmtahan</Link></li>
            <li><Link to="/">Kurslarımız</Link></li>
            <li><Link to="/Vacancies">Vakansiyalar</Link></li>
            <li><Link to="/AboutUs">Haqqımızda</Link></li>
            <li><Link to="/Contact">Əlaqə</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Filiallar</h3>
          <ul className="branches">
            <li>
              <img src="https://www.zefer.edu.az/frq-content/plugins/branches_x1/entry/20173011110309_59622600.jpeg" alt="İnşaatçılar filialı" />
              <span>İnşaatçılar filialı - </span>
              <a href="tel:+994124800875">(012) 480-08-75</a>
            </li>
            <li>
              <img src="https://www.zefer.edu.az/frq-content/plugins/branches_x1/entry/20173011110147_23718600.jpeg" alt="Nərimanov filialı" />
              <span>Nərimanov filialı - </span>
              <a href="tel:+994124802632">(012) 480 26 32</a>
            </li>
            <li>
              <img src="https://www.zefer.edu.az/frq-content/plugins/branches_x1/entry/20173011110309_59622600.jpeg" alt="İnşaatçılar filialı" />
              <span>İnşaatçılar filialı - </span>
              <a href="tel:+994124800875">(012) 480-08-75</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
      <p>Copyright © 2020 Victory Courses. All rights reserved Prepared by</p>
      <div className="social-icons">
            <a href="https://www.facebook.com/" target='_blank' rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
            <a href="https://x.com/?lang=tr" target='_blank' rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
            <a href="https://www.instagram.com/qarant_tedris_merkezi" target='_blank' rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
          </div>
      </div>
    </footer>
  );
}

export default Footer;
