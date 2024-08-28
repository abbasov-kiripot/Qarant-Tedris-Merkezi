import React, { useState, useEffect } from 'react';
import './ContactManagement.css'; // Stil dosyanızı ekleyin

// İletişim bilgilerini almak için API çağrısı yapan fonksiyon
const fetchContacts = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/contacts');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

// İletişim bilgisini silmek için API çağrısı yapan fonksiyon
const deleteContact = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/contacts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }
};

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const data = await fetchContacts();
        setContacts(data);
      } catch (err) {
        setError('Error fetching contacts.');
      } finally {
        setLoading(false);
      }
    };

    getContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      setContacts(contacts.filter(contact => contact._id !== id));
    } catch (err) {
      setError('Error deleting contact.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="contact-management">
      <h2>Contact Information</h2>
      <div className="contact-list">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <div key={contact._id} className="contact-item">
              <h3>{contact.name}</h3>
              <p><strong>Service:</strong> {contact.service}</p>
              <p><strong>Phone:</strong> {contact.phone}</p>
              <p><strong>Email:</strong> {contact.email}</p>
              <p><strong>Message:</strong> {contact.message}</p>
              <button className="delete-btn" onClick={() => handleDelete(contact._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No contacts available.</p>
        )}
      </div>
    </div>
  );
};

export default ContactManagement;
