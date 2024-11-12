import React, { useState, useEffect } from 'react';
import './School.css';

const School = () => {
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/school/');
      const data = await response.json();
      setStages(data);
    } catch (error) {
      console.error('Error fetching stages:', error);
      setError('An error occurred while fetching the stages.');
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="loading-text">Yükleniyor...</p>
    </div>
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="school-container">
      <div className="School-header">
        <h1>Ali Məktəb və Kollec Hazırlığı</h1>
        <p>Şirketimiz hakkında bilgi edinmek için aşağıdaki alanlara göz atın.</p>
      </div>

      <div className="stages-School">
        {stages.map((stage) => (
          <div className="stage-school" key={stage._id}>
            <h2>{stage.title}</h2>
            <p>{stage.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default School;
