import React, { useEffect, useState } from 'react';
import './ExamResultsManagement.css';

const ExamResultsManagement = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newResult, setNewResult] = useState({
    jobNumber: '',
    examName: '',
    examDate: '',
    examTime: '',
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    subjects: '',
    resultFile: null, // Yeni eklenen dosya için state
  });

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/examResults');
        if (!response.ok) throw new Error('Sonuçları alırken hata oluştu');
        const data = await response.json();
        setResults(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const handleDelete = async (jobNumber) => {
    if (window.confirm('Bu sonucu silmek istediğinize emin misiniz?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/examResults/${jobNumber}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Silme işlemi başarısız');
        setResults(results.filter(result => result.jobNumber !== jobNumber));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleAddResult = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('jobNumber', newResult.jobNumber);
    formData.append('examName', newResult.examName);
    formData.append('examDate', newResult.examDate);
    formData.append('examTime', newResult.examTime);
    formData.append('score', newResult.score);
    formData.append('correctAnswers', newResult.correctAnswers);
    formData.append('wrongAnswers', newResult.wrongAnswers);
    formData.append('subjects', newResult.subjects);
    formData.append('resultFile', newResult.resultFile); // Dosya ekleme

    try {
      const response = await fetch('http://localhost:8080/api/examResults', {
        method: 'POST',
        body: formData, // JSON yerine FormData gönderiyoruz
      });
      if (!response.ok) throw new Error('Yeni sonuç eklenemedi');
      const data = await response.json();
      setResults(prevResults => [...prevResults, data]);
      setNewResult({
        jobNumber: '',
        examName: '',
        examDate: '',
        examTime: '',
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        subjects: '',
        resultFile: null,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFileChange = (e) => {
    setNewResult({ ...newResult, resultFile: e.target.files[0] });
  };

  const filteredResults = results.filter(result =>
    result.examName ? result.examName.toLowerCase().includes(searchTerm.toLowerCase()) : false
  );

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;

  return (
    <div className="exam-results-management">
      <h2>Yeni Sonuç Ekle</h2>
      <form onSubmit={handleAddResult}>
        <input
          type="text"
          placeholder="İş Numarası"
          value={newResult.jobNumber}
          onChange={(e) => setNewResult({ ...newResult, jobNumber: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Sınav Adı"
          value={newResult.examName}
          onChange={(e) => setNewResult({ ...newResult, examName: e.target.value })}
          required
        />
        <input
          type="date"
          value={newResult.examDate}
          onChange={(e) => setNewResult({ ...newResult, examDate: e.target.value })}
          required
        />
        <input
          type="time"
          value={newResult.examTime}
          onChange={(e) => setNewResult({ ...newResult, examTime: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Toplam Puan"
          value={newResult.score}
          onChange={(e) => setNewResult({ ...newResult, score: parseInt(e.target.value) })}
          required
        />
        <input
          type="number"
          placeholder="Doğru"
          value={newResult.correctAnswers}
          onChange={(e) => setNewResult({ ...newResult, correctAnswers: parseInt(e.target.value) })}
          required
        />
        <input
          type="number"
          placeholder="Yanlış"
          value={newResult.wrongAnswers}
          onChange={(e) => setNewResult({ ...newResult, wrongAnswers: parseInt(e.target.value) })}
          required
        />
        <input
          type="text"
          placeholder="Konular"
          value={newResult.subjects}
          onChange={(e) => setNewResult({ ...newResult, subjects: e.target.value })}
          required
        />
        <input type="file" onChange={handleFileChange} accept="application/pdf, image/*" required />
        <button type="submit">Sonuç Ekle</button>
      </form>

      <h2>Sınav Sonuçları Yönetimi</h2>
      <input
        type="text"
        placeholder="Sınav Adına Göre Ara"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>İş Numarası</th>
            <th>Sınav Adı</th>
            <th>Tarih</th>
            <th>Saat</th>
            <th>Toplam Puan</th>
            <th>Doğru</th>
            <th>Yanlış</th>
            <th>Konular</th>
            <th>Dosya</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults.map(result => (
            <tr key={result._id}>
              <td>{result.jobNumber}</td>
              <td>{result.examName}</td>
              <td>{result.examDate}</td>
              <td>{result.examTime}</td>
              <td>{result.score}</td>
              <td>{result.correctAnswers}</td>
              <td>{result.wrongAnswers}</td>
              <td>{result.subjects}</td>
              <td>
                {result.resultFile ? (
                  <a href={`http://localhost:8080/uploads/${result.resultFile}`} target="_blank" rel="noopener noreferrer">
                    Dosyayı Görüntüle
                  </a>
                ) : 'Dosya Yok'}
              </td>
              <td>
                <button onClick={() => handleDelete(result.jobNumber)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>


      </table>
    </div>
  );
};

export default ExamResultsManagement;
