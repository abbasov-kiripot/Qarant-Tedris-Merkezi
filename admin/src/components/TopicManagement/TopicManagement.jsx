import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './TopicManagement.css'; // CSS dosyası

const socket = io('http://localhost:8080'); // WebSocket sunucusunun adresi

const TopicManagement = () => {
  const [topics, setTopics] = useState([]);
  const [formState, setFormState] = useState({ title: '', description: '', link: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTopicId, setCurrentTopicId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/topics');
        if (!response.ok) {
          throw new Error('Failed to fetch topics');
        }
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setTopics(data);
        } else {
          console.error('Unexpected data format:', data);
          setTopics([]);
        }
      } catch (err) {
        console.error('Error fetching topics:', err);
        setError('Error fetching topics');
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();

    // WebSocket bağlantısını temizleme
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = async () => {
    try {
      let response;
      if (isEditing) {
        response = await fetch(`http://localhost:8080/api/topics/${currentTopicId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formState),
        });
      } else {
        response = await fetch('http://localhost:8080/api/topics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formState),
        });
      }

      if (response.ok) {
        const data = await response.json();

        if (isEditing) {
          setTopics(topics.map(topic => topic._id === currentTopicId ? data : topic));
        } else {
          setTopics([...topics, data]);
        }

        socket.emit('updateTopics', data); // Yeni veya güncellenmiş konuyu frontend’e bildir
        resetForm();
      } else {
        throw new Error('Failed to save topic');
      }
    } catch (err) {
      console.error('Error saving topic:', err);
      setError('Error saving topic');
    }
  };

  const handleEditClick = (topic) => {
    setFormState(topic);
    setCurrentTopicId(topic._id);
    setIsEditing(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/topics/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTopics(topics.filter(topic => topic._id !== id));
        socket.emit('deleteTopic', id); // Silinen konuyu frontend’e bildir
      } else {
        throw new Error('Failed to delete topic');
      }
    } catch (err) {
      console.error('Error deleting topic:', err);
      setError('Error deleting topic');
    }
  };

  const resetForm = () => {
    setFormState({ title: '', description: '', link: '' });
    setIsEditing(false);
    setCurrentTopicId(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="topic-management-container">
      <h2 className='topic2'>Topic Management</h2>
      <div className="topic-management-header">
        <input
          type="text"
          name="title"
          value={formState.title}
          onChange={handleInputChange}
          placeholder="Title"
        />
        <input
          type="text"
          name="description"
          value={formState.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <input
          type="text"
          name="link"
          value={formState.link}
          onChange={handleInputChange}
          placeholder="Link"
        />
        <button className='Add' onClick={handleFormSubmit}>
          {isEditing ? 'Update Topic' : 'Add Topic'}
        </button>
        {isEditing && <button  onClick={resetForm}>Cancel</button>}
      </div>
      <div className="topic-list">
        {topics.length > 0 ? (
          topics.map(topic => (
            <div key={topic._id} className="topic-item">
              <div className="topic-info">
                <p>{topic.title}</p>
                <p>{topic.description}</p>
                <a href={topic.link} className="topic-link">View Topic</a>
              </div>
              <div className="topic-actions">
                <button className="edit-btn" onClick={() => handleEditClick(topic)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteClick(topic._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No topics available.</p>
        )}
      </div>
    </div>
  );
};

export default TopicManagement;
