import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './schoolManagement.css';

const socket = io('http://localhost:8080'); // WebSocket sunucusunun adresi

const schoolManagement = () => {
  const [stages, setStages] = useState([]);
  const [formState, setFormState] = useState({ title: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentStageId, setCurrentStageId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStages = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/school');
        if (!response.ok) {
          throw new Error('Failed to fetch stages');
        }
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setStages(data);
        } else {
          console.error('Unexpected data format:', data);
          setStages([]);
        }
      } catch (err) {
        console.error('Error fetching stages:', err);
        setError('Error fetching stages');
      } finally {
        setLoading(false);
      }
    };

    fetchStages();

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
        response = await fetch(`http://localhost:8080/api/school/${currentStageId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formState),
        });
      } else {
        response = await fetch('http://localhost:8080/api/school', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formState),
        });
      }

      if (response.ok) {
        const data = await response.json();

        if (isEditing) {
          setStages(stages.map(stage => stage._id === currentStageId ? data : stage));
        } else {
          setStages([...stages, data]);
        }

        socket.emit('updateStages', data); // Yeni veya güncellenmiş aşamayı frontend’e bildir
        resetForm();
      } else {
        throw new Error('Failed to save stage');
      }
    } catch (err) {
      console.error('Error saving stage:', err);
      setError('Error saving stage');
    }
  };

  const handleEditClick = (stage) => {
    setFormState(stage);
    setCurrentStageId(stage._id);
    setIsEditing(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/school/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setStages(stages.filter(stage => stage._id !== id));
        socket.emit('deleteStage', id); // Silinen aşamayı frontend’e bildir
      } else {
        throw new Error('Failed to delete stage');
      }
    } catch (err) {
      console.error('Error deleting stage:', err);
      setError('Error deleting stage');
    }
  };

  const resetForm = () => {
    setFormState({ title: '', description: '' });
    setIsEditing(false);
    setCurrentStageId(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="school-management-container">
      <h2>School Management</h2>
      <div className="school-management-header">
        <input
          type="text"
          name="title"
          value={formState.title}
          onChange={handleInputChange}
          placeholder="Title"
        />
        <textarea
          name="description"
          value={formState.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <button onClick={handleFormSubmit}>
          {isEditing ? 'Update Stage' : 'Add Stage'}
        </button>
        {isEditing && <button onClick={resetForm}>Cancel</button>}
      </div>
      <div className="stage-list">
        {stages.length > 0 ? (
          stages.map(stage => (
            <div key={stage._id} className="stage-item">
              <div className="stage-info">
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
              </div>
              <div className="stage-actions">
                <button className="edit-btn" onClick={() => handleEditClick(stage)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteClick(stage._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No stages available.</p>
        )}
      </div>
    </div>
  );
};

export default schoolManagement;
