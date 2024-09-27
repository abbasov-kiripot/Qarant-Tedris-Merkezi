import React, { useState } from 'react';
import './Results.css';
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoLogoApple } from "react-icons/io5";
import { Link } from "react-router-dom";

const Results = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Şifrelerin eşleşmesini kontrol et
    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler aynı olmalıdır.');
      return;
    }

    // Kullanıcı adı ve e-posta kontrolü için API'ye istek gönder
    try {
      const response = await fetch('http://localhost:8080/api/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (data.usernameExists) {
        setError('Bu kullanıcı adı zaten kullanılıyor.');
        return;
      }

      if (data.emailExists) {
        setError('Bu e-posta adresi zaten kullanılıyor.');
        return;
      }

      // Kayıt işlemi
      const registerResponse = await fetch('http://localhost:8080/api/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      if (!registerResponse.ok) {
        const registerData = await registerResponse.json();
        throw new Error(registerData.message || 'Kayıt sırasında bir hata oluştu.');
      }

      setSuccess('Kayıt başarılı! Şimdi giriş yapabilirsiniz.');
      setError('');

      // Form alanlarını sıfırla
      setFormData({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <img src="https://i.pinimg.com/736x/3f/a4/b3/3fa4b39ee840d16ecf922478affcef2d.jpg" alt="Logo" className="logo" />
        <h2>Qarant Ailəsinə Xoş Gəlmisiniz!</h2>
        <p>Neticeleri öyrənmək üçün əvvəlcə qeydiyyatdan keçmək lazımdır.</p>
      </div>
      <div className="social-login">
        <button className="social-button facebook">
          <FaFacebook />
          Facebook
        </button>
        <button className="social-button google">
          <FcGoogle />
          Google
        </button>
        <button className="social-button apple">
          <IoLogoApple />
          Apple
        </button>
      </div>
      <form onSubmit={handleSubmit} className='form-2'>
        <input 
          type="text" 
          name="username" 
          placeholder="Ad soyad" 
          value={formData.username} 
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
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <div className="Pop">
        <Link to="/Login">Qeydiyyatdan keçmisən? Daxil ol!</Link>
      </div>
    </div>
  );
};

export default Results;
