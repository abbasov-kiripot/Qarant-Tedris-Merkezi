import React, { useState, useEffect } from 'react';
import './MIQ.css';

const MIQ = () => {
  const [stages, setStages] = useState([]);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/miq'); // API URL'yi güncelleyin
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setStages(data);
    } catch (error) {
      console.error('Error fetching stages:', error);
      setError('An error occurred while fetching the stages.');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="miq-container">
      <h1 className="title">Müəllimlərin İşə Qəbuluna Hazırlıq</h1>
      <div className="stages">
        {stages.map((stage) => (
          <div className="stage" key={stage._id}>
            <h2>{stage.title}</h2>
            <p>{stage.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MIQ;
