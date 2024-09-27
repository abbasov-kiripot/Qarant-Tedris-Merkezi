import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './preparationManagement.css';

const socket = io('http://localhost:8080'); // WebSocket sunucusunun adresi

const PreparationManagement = () => {
  const [preparations, setPreparations] = useState([]);
  const [formState, setFormState] = useState({ title: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentPreparationId, setCurrentPreparationId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPreparations = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/preparation');
        if (!response.ok) {
          throw new Error('Failed to fetch preparations');
        }
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setPreparations(data);
        } else {
          console.error('Unexpected data format:', data);
          setPreparations([]);
        }
      } catch (err) {
        console.error('Error fetching preparations:', err);
        setError('Error fetching preparations');
      } finally {
        setLoading(false);
      }
    };

    fetchPreparations();

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
        response = await fetch(`http://localhost:8080/api/preparation/${currentPreparationId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formState),
        });
      } else {
        response = await fetch('http://localhost:8080/api/preparation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formState),
        });
      }

      if (response.ok) {
        const data = await response.json();

        if (isEditing) {
          setPreparations(preparations.map(preparation => preparation._id === currentPreparationId ? data : preparation));
        } else {
          setPreparations([...preparations, data]);
        }

        socket.emit('updatePreparations', data); // Yeni veya güncellenmiş aşamayı frontend’e bildir
        resetForm();
      } else {
        throw new Error('Failed to save preparation');
      }
    } catch (err) {
      console.error('Error saving preparation:', err);
      setError('Error saving preparation');
    }
  };

  const handleEditClick = (preparation) => {
    setFormState(preparation);
    setCurrentPreparationId(preparation._id);
    setIsEditing(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/preparation/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPreparations(preparations.filter(preparation => preparation._id !== id));
        socket.emit('deletePreparation', id); // Silinen aşamayı frontend’e bildir
      } else {
        throw new Error('Failed to delete preparation');
      }
    } catch (err) {
      console.error('Error deleting preparation:', err);
      setError('Error deleting preparation');
    }
  };

  const resetForm = () => {
    setFormState({ title: '', description: '' });
    setIsEditing(false);
    setCurrentPreparationId(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="preparation-management-container">
      <h2>Preparation Management</h2>
      <div className="preparation-management-header">
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
          {isEditing ? 'Update Preparation' : 'Add Preparation'}
        </button>
        {isEditing && <button onClick={resetForm}>Cancel</button>}
      </div>
      <div className="preparation-list">
        {preparations.length > 0 ? (
          preparations.map(preparation => (
            <div key={preparation._id} className="preparation-item">
              <div className="preparation-info">
                <h3>{preparation.title}</h3>
                <p>{preparation.description}</p>
              </div>
              <div className="preparation-actions">
                <button className="edit-btn" onClick={() => handleEditClick(preparation)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteClick(preparation._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No preparations available.</p>
        )}
      </div>
    </div>
  );
};

export default PreparationManagement;
