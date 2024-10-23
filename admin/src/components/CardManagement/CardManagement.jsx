import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './CardManagement.css'; // CSS dosyası

const socket = io('http://localhost:8080'); // WebSocket sunucusunun adresi

const CardManagement = () => {
  const [cards, setCards] = useState([]);
  const [formState, setFormState] = useState({ title: '', description: '', imageUrl: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentCardId, setCurrentCardId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/cards');
        if (!response.ok) {
          throw new Error('Failed to fetch cards');
        }
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setCards(data);
        } else {
          console.error('Unexpected data format:', data);
          setCards([]);
        }
      } catch (err) {
        console.error('Error fetching cards:', err);
        setError('Error fetching cards');
      } finally {
        setLoading(false);
      }
    };

    fetchCards();

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
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing ? `http://localhost:8080/api/cards/${currentCardId}` : 'http://localhost:8080/api/cards';

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Failed to save card: ${errorResponse.message}`);
      }

      const savedCard = await response.json();
      if (isEditing) {
        setCards(cards.map(card => (card._id === currentCardId ? savedCard : card)));
      } else {
        setCards(prevCards => [...prevCards, savedCard]);
        socket.emit('addCard', savedCard); // Yeni kartı frontend’e bildir
      }

      resetForm();
    } catch (err) {
      console.error('Error saving card:', err);
      setError('Error saving card');
    }
  };

  const handleEditClick = (card) => {
    setFormState(card);
    setCurrentCardId(card._id);
    setIsEditing(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/cards/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCards(cards.filter(card => card._id !== id));
        socket.emit('deleteCard', id); // Silinen kartı frontend’e bildir
      } else {
        throw new Error('Failed to delete card');
      }
    } catch (err) {
      console.error('Error deleting card:', err);
      setError('Error deleting card');
    }
  };

  const resetForm = () => {
    setFormState({ title: '', description: '', imageUrl: '' });
    setIsEditing(false);
    setCurrentCardId(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="card-management-container">
      <h2>Card Management</h2>
      <div className="card-management-header">
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
          name="imageUrl"
          value={formState.imageUrl}
          onChange={handleInputChange}
          placeholder="Image URL"
        />
        <button onClick={handleFormSubmit}>
          {isEditing ? 'Update Card' : 'Add Card'}
        </button>
        {isEditing && <button onClick={resetForm}>Cancel</button>}
      </div>
      <div className="card-list">
        {cards.length > 0 ? (
          cards.map(card => (
            <div key={card._id} className="card-item">
              <div className="card-info">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <img src={card.imageUrl} alt={`Card: ${card.title}`} className="card-image" />
              </div>
              <div className="card-actions">
                <button className="edit-btn" onClick={() => handleEditClick(card)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteClick(card._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No cards available.</p>
        )}
      </div>
    </div>
  );
};

export default CardManagement;
