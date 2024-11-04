// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi'; // Çıkış simgesi için react-icons'dan bir ikon
import './Navbar.css';

const Navbar = ({ onLogout }) => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <Link to="/DashboardPage">
          <img 
            src="https://i.pinimg.com/736x/3f/a4/b3/3fa4b39ee840d16ecf922478affcef2d.jpg" 
            alt="Logo" 
          />        
        </Link>
      </div>
      <ul className="navbar-menu">
        <li><Link className='navbar-item' to="/DashboardPage">Dashboard</Link></li>
        <li><Link className='navbar-item' to="/courses">Kurslar</Link></li>
        <li><Link className='navbar-item' to="/users">Kullanıcılar</Link></li>
        <li><Link className='navbar-item' to="/reports">Raporlar</Link></li>
        <li><Link className='navbar-item' to="/notifications">Bildirimler</Link></li>
      </ul>   
      <div className="logout-button" onClick={onLogout} title="Çıkış Yap">
        <FiLogOut size={24} /> {/* react-icons ikonunu ekliyoruz */}
      </div>
    </div>
  );
};

export default Navbar;
