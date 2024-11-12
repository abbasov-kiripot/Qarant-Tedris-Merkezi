import React, { useState, useEffect } from 'react';
import './ExamResults.css';
import { FaFileAlt } from 'react-icons/fa'; // İkon importu

const ExamResults = () => {
  const [selectedExam, setSelectedExam] = useState('');
  const [jobNumber, setJobNumber] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [examDate, setExamDate] = useState('');
  const [examTime, setexamTime] = useState('');
  const [results, setResults] = useState([]); // Başlangıç değeri boş dizi
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [exams, setExams] = useState([]);

  // Sınavları API'den çekmek için useEffect
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/examResults'); // Sınav sonuçlarını al
        if (!response.ok) throw new Error('Sınav sonuçları alınamadı');
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
      const response = await fetch('http://localhost:8080/api/examResults');

      if (!response.ok) throw new Error('Sonuçlar alınamadı');

      const data = await response.json();
      let filterData = data.filter(item => item.jobNumber === jobNumber);

      if (filterData.length > 0) {
        setExamDate(filterData[0].examDate);
        setexamTime(filterData[0].examTime); // examTime'ı da alıyoruz
        setScore(filterData[0].score);
        setPercentage(filterData[0].percentage);
        setResults(filterData);
        setShowResults(true);
      } else {
        setError('Sonuç bulunamadı.');
      }
    } catch (err) {
      setError('Sonuçlar alınırken bir hata oluştu: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewResultFile = (url) => {
    if (url) {
      window.open(url, '_blank'); // URL'yi yeni sekmede aç
    } else {
      alert("Dosya mevcut değil.");
    }
  };

  return (
    <div className="exam-results">
      <form className="exam-form" onSubmit={handleSubmit}>
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

      {loading && <p>Yükleniyor...</p>}
      {error && <p className="error-message">{error}</p>}

      {
        showResults && results.length > 0 ? (
          <div className="results-display">
            <h3>İMTAHAN NƏTİCƏLƏRİ</h3>
            <p><strong>İş Nömrəsi:</strong> {jobNumber}</p>
            <p><strong>İmtahan Saatı:</strong> {examTime}</p>
            <p><strong>İmtahan Tarixi:</strong> {examDate}</p>
            <h4>Sonuçlar:</h4>
            <table className="results-table">
              <thead>
                <tr>
                  <th>Konu/Ders</th>
                  <th>Doğru</th>
                  <th>Yanlış</th>
                  <th>Boş</th>
                  <th>Cavab Kağıdı</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index}>
                    <td>{result.subjects}</td>
                    <td>{result.correctAnswers}</td>
                    <td>{result.wrongAnswers}</td>
                    <td>{result.empty || 0}</td> {/* Eğer boş cevap yoksa 0 göster */}
                    <td>
                      <button
                        className="view-button"
                        onClick={() => handleViewResultFile(result.resultFile)}
                      >
                        Cavab Kağızını Görüntüle <FaFileAlt style={{ marginLeft: '8px' }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null
      }
    </div>
  );
};

export default ExamResults;
