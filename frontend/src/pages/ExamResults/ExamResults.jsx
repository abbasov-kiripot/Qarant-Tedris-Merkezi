import React, { useState, useEffect } from 'react';
import './ExamResults.css';

const ExamResults = () => {
  const [selectedExam, setSelectedExam] = useState('');
  const [jobNumber, setJobNumber] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [examDate, setExamDate] = useState('');
  const [results, setResults] = useState([]); // Başlangıç değeri boş dizi
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/examResults');
        if (!response.ok) throw new Error('Sınavlar alınamadı');
        const data = await response.json();
        const uniqueExams = [...new Set(data.map(result => result.examName))];
        setExams(uniqueExams);
      } catch (err) {
        setError('Sınavlar alınırken bir hata oluştu: ' + err.message);
      }
    };

    fetchExams();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/examResults/getResult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobNumber, examName: selectedExam }),
      });

      if (!response.ok) throw new Error('Sonuçlar alınamadı');

      const data = await response.json();
      setExamDate(data.examDate);
      setResults(data.results || []); // Eğer data.results undefined ise boş dizi olarak ayarlayın
      setScore(data.score);
      setPercentage(data.percentage);
      setShowResults(true);
    } catch (err) {
      setError('Sonuçlar alınırken bir hata oluştu: ' + err.message);
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
          required
        >
          <option value="" disabled>Seçin</option>
          {exams.map((exam, index) => (
            <option key={index} value={exam}>{exam}</option>
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

      {showResults && results.length > 0 && ( // Sadece sonuç varsa göster
        <div className="results-display">
          <h3>İMTAHAN NƏTİCƏLƏRİ</h3>
          <p><strong>İmtahan:</strong> {selectedExam}</p>
          <p><strong>İş Nömrəsi:</strong> {jobNumber}</p>
          <p><strong>İmtahan Tarixi:</strong> {examDate}</p>
          <p><strong>Toplam Puan:</strong> {score}</p>
          {percentage !== null && <p><strong>Başarı Yüzdesi:</strong> %{percentage}</p>}

          <h4>Sonuçlar:</h4>
          <table className="results-table">
            <thead>
              <tr>
                <th>Konu/Ders</th>
                <th>Doğru</th>
                <th>Yanlış</th>
                <th>Boş</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{result.subject}</td>
                  <td>{result.correct}</td>
                  <td>{result.incorrect}</td>
                  <td>{result.empty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExamResults;
