import React, { useState } from 'react';
import './ExamInfoAdmin.css';

const examTypes = [
  { id: 'mock', name: 'Mock Exam', price: 10 },
  { id: 'final', name: 'Final Exam', price: 20 },
  { id: 'entrance', name: 'Entrance Exam', price: 30 },
];

const ExamInfoAdmin = () => {
  const [examData, setExamData] = useState({
    date: '',
    city: '',
    type: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExamData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    if (examData.date && examData.city && examData.type) {
      console.log('Saving Exam Data:', examData);
      // Burada backend'e veri gönderilebilir
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="exam-info-admin">
      <h2>Exam Information Management</h2>
      <div className="form-group">
        <label htmlFor="date">Exam Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={examData.date}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          value={examData.city}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="type">Exam Type</label>
        <select
          id="type"
          name="type"
          value={examData.type}
          onChange={handleChange}
        >
          <option value="">Select Exam Type</option>
          {examTypes.map((exam) => (
            <option key={exam.id} value={exam.id}>
              {exam.name} - ${exam.price}
            </option>
          ))}
        </select>
      </div>
      <button className="save-button" onClick={handleSave}>
        Save Exam Info
      </button>
    </div>
  );
};

export default ExamInfoAdmin;
