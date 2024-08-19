import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-brand">
        <img 
          className='logo' 
          src="https://i.pinimg.com/736x/3f/a4/b3/3fa4b39ee840d16ecf922478affcef2d.jpg" 
          alt="Logo" 
        />
      </div>
      <ul className="navbar-menu">
        <li><Link className='navbar-item' to="/DashboardPage">Dashboard</Link></li>
        <li><Link className='navbar-item' to="/courses">Kurslar</Link></li>
        <li><Link className='navbar-item' to="/users">Kullanıcılar</Link></li>
        <li><Link className='navbar-item' to="/reports">Raporlar</Link></li>
        <li><Link className='navbar-item' to="/notifications">Bildirimler</Link></li>
      </ul>
      <div className="navbar-profile">
        <img 
          className='profile' 
          src="https://cdn2.iconfinder.com/data/icons/shopping-colorline/64/admin-512.png" 
          alt="Profile" 
        />
      </div>
    </div>
  );
};

export default Navbar;
