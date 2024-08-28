import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './ExamManagement.css'; // CSS dosyası

const socket = io('http://localhost:8080'); // WebSocket sunucusunun adresi

const ExamManagement = () => {
  const [exams, setExams] = useState([]);
  const [formState, setFormState] = useState({ date: '', link: '', image: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentExamId, setCurrentExamId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/exams');
        if (!response.ok) {
          throw new Error('Failed to fetch exams');
        }
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setExams(data);
        } else {
          console.error('Unexpected data format:', data);
          setExams([]);
        }
      } catch (err) {
        console.error('Error fetching exams:', err);
        setError('Error fetching exams');
      } finally {
        setLoading(false);
      }
    };

    fetchExams();

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
        response = await fetch(`http://localhost:8080/api/exams/${currentExamId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formState),
        });
      } else {
        response = await fetch('http://localhost:8080/api/exams', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formState),
        });
      }

      if (response.ok) {
        const data = await response.json();

        if (isEditing) {
          setExams(exams.map(exam => exam._id === currentExamId ? data : exam));
        } else {
          setExams([...exams, data]);
        }

        socket.emit('updateExams', data); // Yeni veya güncellenmiş sınavı frontend’e bildir
        resetForm();
      } else {
        throw new Error('Failed to save exam');
      }
    } catch (err) {
      console.error('Error saving exam:', err);
      setError('Error saving exam');
    }
  };

  const handleEditClick = (exam) => {
    setFormState(exam);
    setCurrentExamId(exam._id);
    setIsEditing(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/exams/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setExams(exams.filter(exam => exam._id !== id));
        socket.emit('deleteExam', id); // Silinen sınavı frontend’e bildir
      } else {
        throw new Error('Failed to delete exam');
      }
    } catch (err) {
      console.error('Error deleting exam:', err);
      setError('Error deleting exam');
    }
  };

  const resetForm = () => {
    setFormState({ date: '', link: '', image: '' });
    setIsEditing(false);
    setCurrentExamId(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="exam-management-container">
      <h2>Exam Management</h2>
      <div className="exam-management-header">
        <input
          type="date"
          name="date"
          value={formState.date}
          onChange={handleInputChange}
          placeholder="Date"
        />
        <input
          type="text"
          name="link"
          value={formState.link}
          onChange={handleInputChange}
          placeholder="Link"
        />
        <input
          type="text"
          name="image"
          value={formState.image}
          onChange={handleInputChange}
          placeholder="Image URL"
        />
        <button onClick={handleFormSubmit}>
          {isEditing ? 'Update Exam' : 'Add Exam'}
        </button>
        {isEditing && <button onClick={resetForm}>Cancel</button>}
      </div>
      <div className="exam-list">
        {exams.length > 0 ? (
          exams.map(exam => (
            <div key={exam._id} className="exam-item">
              <div className="exam-info">
                <p>{exam.date}</p>
                <img src={exam.image} alt={`Exam on ${exam.date}`} className="exam-image" />
                <a href={exam.link} className="exam-link">View Exam</a>
              </div>
              <div className="exam-actions">
                <button className="edit-btn" onClick={() => handleEditClick(exam)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteClick(exam._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No exams available.</p>
        )}
      </div>
    </div>
  );
};

export default ExamManagement;
