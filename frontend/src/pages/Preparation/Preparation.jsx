import React, { useState, useEffect } from 'react';
import './Preparation.css';

const Preparation = () => {
  const [stages, setStages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/preparation/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="masters-preparation-container">
      <h1 className="title">Master's Preparation</h1>
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
}

export default Preparation;
