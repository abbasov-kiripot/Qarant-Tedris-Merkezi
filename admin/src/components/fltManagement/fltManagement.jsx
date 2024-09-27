import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './fltManagement.css';

const socket = io('http://localhost:8080'); // WebSocket sunucusunun adresi

const FLTManagement = () => {
  const [stages, setStages] = useState([]);
  const [newStage, setNewStage] = useState({ title: '', description: '' });
  const [editStage, setEditStage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStages = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/flts');
        if (!response.ok) throw new Error('Failed to fetch stages');
        const data = await response.json();
        setStages(data);
      } catch (error) {
        console.error('Error fetching stages:', error);
        setError('An error occurred while fetching the stages.');
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

  const handleAddStage = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/flts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStage),
      });
      if (!response.ok) throw new Error('Failed to add stage');
      const addedStage = await response.json();
      setStages(prevStages => [...prevStages, addedStage]);
      socket.emit('updateStages', addedStage); // Yeni aşamayı frontend’e bildir
      setNewStage({ title: '', description: '' });
    } catch (error) {
      console.error('Error adding stage:', error);
      setError('An error occurred while adding the stage.');
    }
  };

  const handleEditStage = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/flts/${editStage._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editStage),
      });
      if (!response.ok) throw new Error('Failed to update stage');
      const updatedStage = await response.json();
      setStages(prevStages =>
        prevStages.map(stage => (stage._id === updatedStage._id ? updatedStage : stage))
      );
      socket.emit('updateStages', updatedStage); // Güncellenmiş aşamayı frontend’e bildir
      setEditStage(null);
    } catch (error) {
      console.error('Error updating stage:', error);
      setError('An error occurred while updating the stage.');
    }
  };

  const handleDeleteStage = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/flts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete stage');
      setStages(prevStages => prevStages.filter(stage => stage._id !== id));
      socket.emit('deleteStage', id); // Silinen aşamayı frontend’e bildir
    } catch (error) {
      console.error('Error deleting stage:', error);
      setError('An error occurred while deleting the stage.');
    }
  };

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  return (
    <div className="flt-management-container">

      <div className="form-container">
        <h2>{editStage ? 'Edit Stage' : 'Add New Stage'}</h2>
        <input
          type="text"
          placeholder="Title"
          value={editStage ? editStage.title : newStage.title}
          onChange={(e) => (editStage ? setEditStage(prev => ({ ...prev, title: e.target.value })) : setNewStage(prev => ({ ...prev, title: e.target.value })))}
        />
        <textarea
          placeholder="Description"
          value={editStage ? editStage.description : newStage.description}
          onChange={(e) => (editStage ? setEditStage(prev => ({ ...prev, description: e.target.value })) : setNewStage(prev => ({ ...prev, description: e.target.value })))}
        />
        <div className="form-buttons">
          <button className="submit-btn" onClick={editStage ? handleEditStage : handleAddStage}>
            {editStage ? 'Update Stage' : 'Add Stage'}
          </button>
          {editStage && <button className="cancel-btn" onClick={() => setEditStage(null)}>Cancel</button>}
        </div>
      </div>

      <div className="stages">
        {stages.length > 0 ? (
          stages.map((stage) => (
            <div className="stage" key={stage._id}>
              <h2>{stage.title}</h2>
              <p>{stage.description}</p>
              <div className="stage-actions">
                <button className="edit-btn" onClick={() => setEditStage(stage)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteStage(stage._id)}>Delete</button>
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

export default FLTManagement;
