import React, { useState, useEffect, useRef } from 'react';
import './ExamInfo.css';
import { Link } from 'react-router-dom';

const prices = {
  mock: 10,
  final: 20,
  entrance: 30,
};

const ExamInfo = () => {
  const [examDate, setExamDate] = useState('');
  const [city, setCity] = useState('');
  const [examType, setExamType] = useState('');
  const [link, setLink] = useState('');

  const examInfoRef = useRef(null);

  // Fiyat verisini fetch etmek için bir effect
  useEffect(() => {
    if (examDate && city && examType) {
      // Fiyat verisini hesapla ve URL'ye ekle
      const fetchedPrice = prices[examType] || 0;
      setLink(`/PlaceOrder?date=${examDate}&city=${city}&type=${examType}&price=${fetchedPrice}`);
    }
  }, [examDate, city, examType]);

  // Intersection Observer ile görünüyor işlevi
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (examInfoRef.current) {
      observer.observe(examInfoRef.current);
    }

    return () => {
      if (examInfoRef.current) {
        observer.unobserve(examInfoRef.current);
      }
    };
  }, []);

  return (
    <div className="exam-info" ref={examInfoRef}>
      <div className="info-item">
        <img src="https://www.zefer.edu.az/frq-templates/assets/images/icons/online.png" alt="Mock Exam Dates" />
        <h3>Mock Exam Dates</h3>
        <Link to="/MED">More</Link>
      </div>
      <div className="info-item">
        <img src="https://www.zefer.edu.az/frq-templates/assets/images/icons/book.png" alt="Mock Exam Topics" />
        <h3>Mock Exam Topics</h3>
        <Link to="/MET">More</Link>
      </div>
      <div className="info-item">
        <img src="https://www.zefer.edu.az/frq-templates/images/examresults.png" alt="Exam Results" />
        <h3>Exam Results</h3>
        <Link to="/ExamResults">Check it out</Link>
      </div>
      <h2>Buy your ticket with 1 Click</h2>
      <div className="container-info">
        <div className="select-section">
          <input
            type="date"
            id="exam-date"
            name="exam-date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            placeholder="Select exam date"
          />
          <select id="city" name="city" value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">Select a city</option>
            <option value="baku">Baku</option>
            <option value="ganja">Gence</option>
            <option value="sumqayit">Sumgayıt</option>
            <option value="mingechevir">Mingəçevir</option>
            <option value="lankaran">Lənkəran</option>
          </select>
          <select id="exam-type" name="exam-type" value={examType} onChange={(e) => setExamType(e.target.value)}>
            <option value="">Choose an exam type</option>
            <option value="mock">Mock Exam - $10</option>
            <option value="final">Final Exam - $20</option>
            <option value="entrance">Entrance Exam - $30</option>
          </select>
          <button onClick={() => {
            if (examDate && city && examType) {
              setLink(`/PlaceOrder?date=${examDate}&city=${city}&type=${examType}&price=${prices[examType]}`);
            }
          }}>
            <Link to={link}>Go to Details</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamInfo;
