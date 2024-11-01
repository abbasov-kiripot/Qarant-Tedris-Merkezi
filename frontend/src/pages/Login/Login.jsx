import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import './Login.css';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const loginUser = async (e) => {
    e.preventDefault();
    
    if (!isEmailValid(loginData.email)) {
      setErrorMessage("Geçersiz e-posta formatı.");
      return;
    }

    setLoading(true);
    try {
      const loginResponse = await fetch("http://localhost:8080/api/results/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const loginDataResponse = await loginResponse.json();

      if (loginResponse.ok) {
        const profileResponse = await fetch("http://localhost:8080/api/profiles");
        const profileData = await profileResponse.json();
        const userProfile = profileData.find(profile => profile.email === loginData.email);

        if (userProfile) {
          localStorage.setItem("profileData", JSON.stringify(userProfile));
          localStorage.setItem("isLogin", "true");
          navigate("/profile");
        } else {
          setErrorMessage("Profil bulunamadı.");
        }
      } else {
        setErrorMessage(loginDataResponse.message || "Email veya şifre hatalı.");
      }
    } catch (error) {
      console.error("API hatası:", error);
      setErrorMessage("Sunucu hatası, lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-container-one'>
    <div className="login-container">
      <div className="login-box">
        <div>
          <h2 className="login-title">
            Hesabınıza Giriş Edin
          </h2>
        </div>
        <form className="login-form" onSubmit={loginUser}>
          <div className="input-container">
            <div className="input-wrapper">
              <label htmlFor="email" className="sr-only">
                Email adresi
              </label>
              <Mail className="input-icon" />
              <input
                id="email"
                name="email"
                type="email"
                required
                value={loginData.email}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Email adresiniz"
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password" className="sr-only">
                Şifrə
              </label>
              <Lock className="input-icon" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={loginData.password}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Şifreniz"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? 
                  <EyeOff className="toggle-icon" /> : 
                  <Eye className="toggle-icon" />
                }
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="error-container">
              <div className="error-content">
                <div className="error-icon-wrapper">
                  <svg className="error-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="error-message">
                  <p>{errorMessage}</p>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="submit-button"
            >
              {loading ? (
                <svg className="loading-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {loading ? "Daxil Olunur..." : "Daxil Ol"}
            </button>
          </div>

          <div className="signup-link-container">
            <div className="signup-text">
              <Link to="/Results" className="signup-link">
                Hesabınız yok du? Qeydiyyatdan keçin
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;