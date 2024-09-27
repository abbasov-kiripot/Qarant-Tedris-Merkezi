import React, { useState, useEffect } from 'react';
import './AboutUsManagement.css';

const AboutUsManagement = () => {
    const [aboutUsData, setAboutUsData] = useState([]);
    const [formState, setFormState] = useState({ title: '', description: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [currentSectionId, setCurrentSectionId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAboutUsData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/about-us');
                if (!response.ok) {
                    throw new Error('Failed to fetch About Us data');
                }
                const data = await response.json();
                setAboutUsData(data);
            } catch (err) {
                setError('Error fetching About Us data');
            } finally {
                setLoading(false);
            }
        };

        fetchAboutUsData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFormSubmit = async () => {
        try {
            let response;
            if (isEditing) {
                response = await fetch(`http://localhost:8080/api/about-us/${currentSectionId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formState),
                });
            } else {
                response = await fetch('http://localhost:8080/api/about-us', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formState),
                });
            }

            if (response.ok) {
                const data = await response.json();
                if (isEditing) {
                    setAboutUsData(aboutUsData.map(section =>
                        section._id === currentSectionId ? data : section
                    ));
                } else {
                    setAboutUsData([...aboutUsData, data]);
                }
                resetForm();
            } else {
                throw new Error('Failed to save About Us data');
            }
        } catch (err) {
            setError('Error saving About Us data');
        }
    };

    const handleEditClick = (section) => {
        setFormState({ title: section.title, description: section.description });
        setCurrentSectionId(section._id);
        setIsEditing(true);
    };

    const handleDeleteClick = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/about-us/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setAboutUsData(aboutUsData.filter(section => section._id !== id));
            } else {
                throw new Error('Failed to delete About Us data');
            }
        } catch (err) {
            setError('Error deleting About Us data');
        }
    };

    const resetForm = () => {
        setFormState({ title: '', description: '' });
        setIsEditing(false);
        setCurrentSectionId(null);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="about-us-management-container">
            <h2>About Us Management</h2>
            <div className="about-us-form">
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
                    {isEditing ? 'Update Section' : 'Add Section'}
                </button>
                {isEditing && <button onClick={resetForm}>Cancel</button>}
            </div>
            <div className="about-us-list">
                {aboutUsData.length > 0 ? (
                    aboutUsData.map(section => (
                        <div key={section._id} className="about-us-item">
                            <h3>{section.title}</h3>
                            <p>{section.description}</p>
                            <button onClick={() => handleEditClick(section)}>Edit</button>
                            <button onClick={() => handleDeleteClick(section._id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No sections available.</p>
                )}
            </div>
        </div>
    );
};

export default AboutUsManagement;
