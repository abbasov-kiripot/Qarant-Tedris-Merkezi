import React, { useState } from 'react';
import "./adminlogin.css";

const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/results/login', {  // API yolunu kontrol edelim
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok && data.token) {  // Token varsa başarılı giriş yap
        onLoginSuccess(data.token);
      } else {
        setError('Geçersiz kullanıcı adı veya parola');
      }
    } catch (error) {
      setError('Sunucu hatası');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="admin-login-form">
      <h2>Admin Girişi</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
        placeholder="email"
        required
      />
      {error && <p className="error-message">{error}</p>}
      <div className="password-input-container">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Parola"
          minLength={8}
          required
        />
        <button
          type="button"
          className="show-password-button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? 'Gizle' : 'Göster'}
        </button>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
      </button>
    </form>
  );
};

export default AdminLogin;
