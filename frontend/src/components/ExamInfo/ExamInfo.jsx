import React, { useState, useEffect, useRef } from 'react';
import './ExamInfo.css';
import { Link } from 'react-router-dom';

const prices = {
  mock: 8,
  final: 12,
  entrance: 16,
  bigFinal: 20,

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
    <div className="exam-info" ref={examInfoRef}  >
      <div className="info-items">
        <img src="https://www.zefer.edu.az/frq-templates/assets/images/icons/online.png" alt="Mock Exam Dates" />
        <h3>Sınaq İmtahan Tarixləri</h3>
        <Link to="/MED">Detallar</Link>
      </div>
      <div className="info-items">
        <img src="https://www.zefer.edu.az/frq-templates/assets/images/icons/book.png" alt="Mock Exam Topics" />
        <h3>Sınaq imtahan mövzuları</h3>
        <Link to="/MET">Detallar</Link>
      </div>
      <div className="info-items">
        <img src="https://www.zefer.edu.az/frq-templates/images/examresults.png" alt="Exam Results" />
        <h3>İmtahan Nəticələri</h3>
        <Link to="/ExamResults">Yoxlayın</Link>
      </div>
      <h2 id="bletsatisi">Biletinizi indi asanlıqla 1 kliklə alın!</h2>
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
            <option value="">Filial seçin</option>
            <option value="Binə Sovxoz">Binə Sovxoz </option>
            <option value="Xirdalan">Xırdalan</option>
          </select>
          <select id="exam-type" name="exam-type" value={examType} onChange={(e) => setExamType(e.target.value)}>
            <option value="">İmtahan növünü seçin</option>
            <option value="mock">İbtidai siniflər "2-4" 8AZN</option>
            <option value="final">Təməl siniflər "5-8" 12AZN</option>
            <option value="entrance">Buraxılış imtahanı "9-11" 20AZN</option>
            <option value="entrance">Blok imtahanı "9-11" 16AZN</option>
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
