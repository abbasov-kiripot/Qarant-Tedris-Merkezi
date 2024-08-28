import React, { useState, useEffect } from 'react';
import './MET.css'; // CSS dosyası

const MET = () => {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null);

  const fetchTopics = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/topics');
      if (!response.ok) {
        throw new Error('Failed to fetch topics');
      }
      const data = await response.json();
      setTopics(data);
    } catch (error) {
      console.error('Error fetching topics:', error);
      setError('Error fetching topics');
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="med-container">
      <h2>Available Topics</h2>
      <div className="med-list">
        {topics.map((topic) => (
          <div className="med-card" key={topic._id}>
            <div className="med-content">
              <h3 className="med-title">{topic.title}</h3>
              <p className="med-description">{topic.description}</p>
              <a href={topic.link} className="link-button">Learn More</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MET;
