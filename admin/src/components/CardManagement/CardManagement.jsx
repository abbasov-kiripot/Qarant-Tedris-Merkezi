import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './CardManagement.css'; // Global CSS dosyası

const socket = io('http://localhost:8080'); // WebSocket sunucusunun adresi

const CardManagement = () => {
  const [cards, setCards] = useState([]);
  const [formState, setFormState] = useState({ title: '', description: '', imageUrl: '', createdAt: new Date(), price: 0});
  const [isEditing, setIsEditing] = useState(false);
  const [currentCardId, setCurrentCardId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/cards');
        const data = await response.json();

        if (response.ok) {
          console.log("API Response:", data); // Veriyi inceleyin

          if (Array.isArray(data)) {
            setCards(data);
          } else if (data.cards && Array.isArray(data.cards)) {
            setCards(data.cards); // Eğer 'cards' içinde bir dizi varsa
          } else {
            console.error("Unexpected data format:", data);
            setCards([]);
          }
        } else {
          throw new Error('Failed to fetch cards');
        }
      } catch (err) {
        console.error("Error fetching cards:", err);
        setError("Error fetching cards");
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
      let response;
      if (isEditing) {
        response = await fetch(`http://localhost:8080/api/cards/${currentCardId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formState),
        });
      } else {
        response = await fetch('http://localhost:8080/api/cards', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formState),
        });
      }

      if (response.ok) {
        const data = await response.json();

        if (isEditing) {
          setCards(cards.map(card => card._id === currentCardId ? data : card));
        } else {
          setCards([...cards, data]);
        }

        socket.emit('updateCards', data); // Yeni veya güncellenmiş kartı frontend’e bildir
        resetForm();
      } else {
        throw new Error('Failed to save card');
      }
    } catch (err) {
      console.error("Error saving card:", err);
      setError("Error saving card");
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
      console.error("Error deleting card:", err);
      setError("Error deleting card");
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
          {isEditing ? "Update Card" : "Add Card"}
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
                <img src={card.imageUrl} alt={card.title} className="card-image" />
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