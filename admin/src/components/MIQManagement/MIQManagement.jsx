import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './MIQManagement.css'; // CSS dosyasını güncelledik

const socket = io('http://localhost:8080'); // WebSocket sunucusunun adresi

const MIQManagement = () => {
  const [miqs, setMiqs] = useState([]); // 'preparations' yerine 'miqs' kullanıldı
  const [formState, setFormState] = useState({ title: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentMiqId, setCurrentMiqId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMiqs = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/miq'); // API yolunu güncelledik
        if (!response.ok) {
          throw new Error('Failed to fetch MIQs');
        }
        const data = await response.json();

        if (Array.isArray(data)) {
          setMiqs(data);
        } else {
          console.error('Unexpected data format:', data);
          setMiqs([]);
        }
      } catch (err) {
        console.error('Error fetching MIQs:', err);
        setError('Error fetching MIQs');
      } finally {
        setLoading(false);
      }
    };

    fetchMiqs();

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
        response = await fetch(`http://localhost:8080/api/miq/${currentMiqId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formState),
        });
      } else {
        response = await fetch('http://localhost:8080/api/miq', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formState),
        });
      }

      if (response.ok) {
        const data = await response.json();

        if (isEditing) {
          setMiqs(miqs.map(miq => miq._id === currentMiqId ? data : miq));
        } else {
          setMiqs([...miqs, data]);
        }

        socket.emit('updateMiqs', data); // Yeni veya güncellenmiş MIQ'yu frontend’e bildir
        resetForm();
      } else {
        throw new Error('Failed to save MIQ');
      }
    } catch (err) {
      console.error('Error saving MIQ:', err);
      setError('Error saving MIQ');
    }
  };

  const handleEditClick = (miq) => {
    setFormState(miq);
    setCurrentMiqId(miq._id);
    setIsEditing(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/miq/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMiqs(miqs.filter(miq => miq._id !== id));
        socket.emit('deleteMiq', id); // Silinen MIQ'yu frontend’e bildir
      } else {
        throw new Error('Failed to delete MIQ');
      }
    } catch (err) {
      console.error('Error deleting MIQ:', err);
      setError('Error deleting MIQ');
    }
  };

  const resetForm = () => {
    setFormState({ title: '', description: '' });
    setIsEditing(false);
    setCurrentMiqId(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="miq-management-container">
      <h2>MIQ Management</h2>
      <div className="form-container">
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
          {isEditing ? 'Update MIQ' : 'Add MIQ'}
        </button>
        {isEditing && <button onClick={resetForm}>Cancel</button>}
      </div>
      <div className="miq-list">
        {miqs.length > 0 ? (
          miqs.map(miq => (
            <div key={miq._id} className="miq-item">
              <div className="miq-info">
                <h3>{miq.title}</h3>
                <p>{miq.description}</p>
              </div>
              <div className="miq-actions">
                <button className="edit-btn" onClick={() => handleEditClick(miq)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteClick(miq._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No MIQs available.</p>
        )}
      </div>
    </div>
  );
};

export default MIQManagement;
