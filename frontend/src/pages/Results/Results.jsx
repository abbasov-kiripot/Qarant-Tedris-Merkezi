import React, { useState } from 'react';
import './Results.css';
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoLogoApple } from "react-icons/io5";
import { Link } from "react-router-dom";

const Results = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic
    console.log('Form submitted:', formData);
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <img src="https://i.pinimg.com/736x/3f/a4/b3/3fa4b39ee840d16ecf922478affcef2d.jpg" alt="Logo" className="logo" />
        <h2>Qarant Ailəsinə Xoş Gəlmisiniz!</h2>
        <p>Neticeleri oyrenmek üçün əvvəlcə qeydiyyatdan keçmək lazımdır.</p>
      </div>
      <div className="social-login">
        <button className="social-button facebook">
        <FaFacebook />
          Facebook</button>
        <button className="social-button google">
        <FcGoogle />
          Google</button>
        <button className="social-button apple">
        <IoLogoApple />
          Apple</button>
      </div>
      <form onSubmit={handleSubmit} className='form-2'>
        <input 
          type="text" 
          name="name" 
          placeholder="Ad soyad" 
          value={formData.name} 
          onChange={handleChange} 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
        />
        <input 
          type="tel" 
          name="phone" 
          placeholder="Telefon" 
          value={formData.phone} 
          onChange={handleChange} 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Şifrə" 
          value={formData.password} 
          onChange={handleChange} 
        />
        <input 
          type="password" 
          name="confirmPassword" 
          placeholder="Şifrəni Təsdiqlə" 
          value={formData.confirmPassword} 
          onChange={handleChange} 
        />
        <div className="terms">
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            İstifadəçi razılaşması və Məxfilik siyasətini qəbul edirəm.
          </label>
        </div>
        <button type="submit" className="submit-button">Qeydiyyatdan Keç</button>
      </form>
      <div className="Pop">
        <Link to="/Login">Qeydiyyatdan keçmisən? Daxil ol!</Link>
      </div>
    </div>
  );
};

export default Results;
