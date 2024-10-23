import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // E-posta formatını kontrol eden fonksiyon
  const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);

  const loginUser = async (e) => {
    e.preventDefault();
    
    // E-posta geçerliliği kontrolü
    if (!isEmailValid(loginData.email)) {
      setErrorMessage("Geçersiz e-posta formatı.");
      return;
    }

    setLoading(true); // Yükleme durumunu başlat
    try {
      const response = await fetch("http://localhost:8080/api/results/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("isLogin", "true"); // Başarılı girişte yerel depolama
        navigate("/profile"); // Profil sayfasına yönlendir
      } else {
        // API'den dönen hata mesajını göster
        setErrorMessage(data.message || "Email veya şifre hatalı.");
      }
    } catch (error) {
      console.error("API hatası:", error); // Hata detaylarını konsola yazdır
      setErrorMessage("Sunucu hatası, lütfen tekrar deneyin.");
    } finally {
      setLoading(false); // Yükleme durumunu sonlandır
    }
  };

  return (
    <section id="products">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 contact-form">
            <form onSubmit={loginUser}>
              <input
                type="email"
                placeholder="Your email address."
                required
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                required
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />
              <br />
              <input type="submit" value={loading ? "Giriş yapılıyor..." : "Sign In"} disabled={loading} />
            </form>

            {/* Hata mesajını göster */}
            {errorMessage && <p className="error">{errorMessage}</p>}
            
            <p>Hesabınız yok mu? <Link to="/Results">Kayıt olun</Link></p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
