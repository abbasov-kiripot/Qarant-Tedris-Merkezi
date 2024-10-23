import React, { useState } from 'react';
import './Registration.css';

const Registration = () => {
  const [exam, setExam] = useState('');
  const [direction, setDirection] = useState('');
  const [city, setCity] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(''); // Added email state
  const [birthDay, setBirthDay] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [message, setMessage] = useState(''); // Başarı ve hata mesajlarını göstermek için

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const registrationData = {
      email,
      exam,
      direction,
      city,
      firstName,
      lastName,
      fatherName,
      phone,
      birthDay: parseInt(birthDay, 10),
      birthMonth: parseInt(birthMonth, 10),
      birthYear: parseInt(birthYear, 10),
    };
  
    try {
      const response = await fetch('http://localhost:8080/api/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
      });
  
      if (response.ok) {
        setMessage('Registration successful!');
        // Reset form fields
        setExam('');
        setDirection('');
        setCity('');
        setFirstName('');
        setLastName('');
        setFatherName('');
        setPhone('');
        setEmail(''); // Reset email field
        setBirthDay('');
        setBirthMonth('');
        setBirthYear('');
      } else {
        // Check if the response is JSON
        try {
          const errorData = await response.json();
          setMessage(`İlk öncə forumu doldurun`);
        } catch (jsonError) {
          // If JSON parsing fails, assume the response is HTML or plain text
          setMessage(`Error: ${response.statusText || 'An error occurred'}`);
        }
      }
    } catch (error) {
      setMessage('Error: Could not connect to the server');
      console.error('Error details:', error); // Log the error for debugging
    } finally {
      // Optional: Do something regardless of success or failure
      console.log('Request completed');
    }
  };
  
  
  
  return (
    <div className="online-exam-portal">
      <h2>Qeydiyyat formu</h2>
      <form onSubmit={handleSubmit}>
        <select value={exam} onChange={(e) => setExam(e.target.value)}>
          <option value="">İmtahan seçin</option>
          <option value="Exam1">Exam1</option>
          <option value="Exam2">Exam2</option>
        </select>
        <select value={direction} onChange={(e) => setDirection(e.target.value)}>
          <option value="">İstiqamət seçin</option>
          <option value="Direction1">Direction1</option>
          <option value="Direction2">Direction2</option>
        </select>
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">Fillial seçin</option>
          <option value="City1">City1</option>
          <option value="City2">City2</option>
        </select>
        <input
          type="text"
          placeholder="Ad"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Soyadı"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Atanın adı"
          value={fatherName}
          onChange={(e) => setFatherName(e.target.value)}
        />
        <input
          type="email" // Email input field
          placeholder="E-poçt ünvanı"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Telefon nömrəsi (məsələn, 012 123 45 67)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div className="birth-date">
          <select value={birthDay} onChange={(e) => setBirthDay(e.target.value)}>
            <option value="">GÜN</option>
            {[...Array(31).keys()].map(day => (
              <option key={day + 1} value={day + 1}>{day + 1}</option>
            ))}
          </select>
          <select value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)}>
            <option value="">AY</option>
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
              <option key={index + 1} value={index + 1}>{month}</option>
            ))}
          </select>
          <select value={birthYear} onChange={(e) => setBirthYear(e.target.value)}>
            <option value="">İL</option>
            {[...Array(100).keys()].map(year => (
              <option key={2024 - year} value={2024 - year}>{2024 - year}</option>
            ))}
          </select>
        </div>
        <button type="submit">GÖNDƏR</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default Registration;
