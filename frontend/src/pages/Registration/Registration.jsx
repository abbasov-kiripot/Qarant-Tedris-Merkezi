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
  const [birthDay, setBirthDay] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="online-exam-portal">
      <h2>Exam Portal</h2>
      <form onSubmit={handleSubmit}>
        <select value={exam} onChange={(e) => setExam(e.target.value)}>
          <option value="">Select Exam</option>
          {/* Other options can be added here */}
        </select>
        <select value={direction} onChange={(e) => setDirection(e.target.value)}>
          <option value="">Select Direction</option>
          {/* Other options can be added here */}
        </select>
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">Select City</option>
          {/* Other options can be added here */}
        </select>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Father's Name"
          value={fatherName}
          onChange={(e) => setFatherName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number (012 123 45 67)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div className="birth-date">
          <select value={birthDay} onChange={(e) => setBirthDay(e.target.value)}>
            <option value="">Day</option>
            {/* Day options can be added here */}
          </select>
          <select value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)}>
            <option value="">Month</option>
            {/* Month options can be added here */}
          </select>
          <select value={birthYear} onChange={(e) => setBirthYear(e.target.value)}>
            <option value="">Year</option>
            {/* Year options can be added here */}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Registration;
