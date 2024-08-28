import React, { useState, useEffect } from 'react';
import './MED.css'; // CSS dosyası

const ExamDates = () => {
  const [exams, setExams] = useState([]);
  const [error, setError] = useState(null);

  const fetchExams = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/exams');
      if (!response.ok) {
        throw new Error('Failed to fetch exams');
      }
      const data = await response.json();
      setExams(data);
    } catch (error) {
      console.error('Error fetching exams:', error);
      setError('Error fetching exams');
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="exam-dates">
      <h2>Upcoming Exams</h2>
      <div className="exam-list">
        {exams.map((exam) => (
          <div className="exam-card" key={exam._id}>
            <img src={exam.image} alt={`Exam on ${exam.date}`} className="exam-image" />
            <div className="exam-content">
              <p className="exam-date">Date: {exam.date}</p>
              <a href={exam.link} className="link-button">Details</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamDates;
