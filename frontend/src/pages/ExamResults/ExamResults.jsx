import React, { useState } from 'react';
import './ExamResults.css';

const exams = [
  { id: 1, name: '09.06.2024 - Buraxılış İmtahanı - Sinif 1' },
  { id: 2, name: '10.06.2024 - Buraxılış İmtahanı - Sinif 2' },
  { id: 3, name: '11.06.2024 - Buraxılış İmtahanı - Sinif 3' },
  { id: 4, name: '12.06.2024 - Buraxılış İmtahanı - Sinif 4' },
  { id: 5, name: '13.06.2024 - Buraxılış İmtahanı - Sinif 5' },
  { id: 6, name: '14.06.2024 - Buraxılış İmtahanı - Sinif 6' },
  { id: 7, name: '15.06.2024 - Buraxılış İmtahanı - Sinif 7' },
  { id: 8, name: '16.06.2024 - Buraxılış İmtahanı - Sinif 8' },
  { id: 9, name: '17.06.2024 - Buraxılış İmtahanı - Sinif 9' },
  { id: 10, name: '18.06.2024 - Buraxılış İmtahanı - Sinif 10' },
  { id: 11, name: '19.06.2024 - Buraxılış İmtahanı - Sinif 11' },
  { id: 12, name: '20.06.2024 - 1. Qrup' },
  { id: 13, name: '21.06.2024 - 2. Qrup' },
  { id: 14, name: '22.06.2024 - 3. Qrup' },
  { id: 15, name: '23.06.2024 - 4. Qrup' },
];

const ExamResults = () => {
  const [selectedExam, setSelectedExam] = useState('');
  const [jobNumber, setJobNumber] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [examDate, setExamDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // API'ye iş numarasını ve seçilen imtahanı gönderiyoruz
      const response = await fetch('/api/getExamResults', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobNumber, examName: selectedExam }),
      });

      if (!response.ok) throw new Error('API isteğinde bir hata oluştu');

      const data = await response.json();
      // API'den dönen verileri işliyoruz
      setExamDate(data.examDate);
      setShowResults(true);
    } catch (err) {
      setError('Sonuçlar alınırken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="exam-results">
      <form className="exam-form" onSubmit={handleSubmit}>
        <label htmlFor="exam-select" className="form-label">İmtahan Seçin:</label>
        <select
          id="exam-select"
          className="form-select"
          value={selectedExam}
          onChange={(e) => setSelectedExam(e.target.value)}
        >
          <option value="" disabled>Seçin</option>
          {exams.map((exam) => (
            <option key={exam.id} value={exam.name}>{exam.name}</option>
          ))}
        </select>
        
        <label htmlFor="job-number" className="form-label">İş Nömrəsi:</label>
        <input
          type="text"
          id="job-number"
          className="form-input"
          value={jobNumber}
          onChange={(e) => setJobNumber(e.target.value)}
          required
        />
        
        <button type="submit" className="form-button" disabled={loading}>
          {loading ? 'Yükleniyor...' : 'Nəticələri Göstər'}
        </button>
      </form>
      
      {error && <p className="error-message">{error}</p>}
      
      {showResults && (
        <div className="results-display">
          <h3>İMTAHAN NƏTİCƏLƏRİ</h3>
          <p>{selectedExam}</p>
          <p>İş Nömrəsi: {jobNumber}</p>
          <p>İmtahan Tarixi: {examDate}</p>
        </div>
      )}
    </div>
  );
};

export default ExamResults;
