import React, { useState } from 'react';
import './CoursesPage.css';

const CoursesPage = () => {
  const [courses, setCourses] = useState([
    { id: 1, title: 'React for Beginners', description: 'A basic course on React.js.' },
    { id: 2, title: 'Advanced React', description: 'In-depth React.js concepts.' },
  ]);
  const [newCourse, setNewCourse] = useState({ title: '', description: '' });
  const [editingCourse, setEditingCourse] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };

  const addCourse = () => {
    if (newCourse.title && newCourse.description) {
      setCourses((prev) => [
        ...prev,
        { id: Date.now(), ...newCourse },
      ]);
      setNewCourse({ title: '', description: '' });
      setShowForm(false);
    }
  };

  const editCourse = (course) => {
    setEditingCourse(course);
    setNewCourse({ title: course.title, description: course.description });
    setShowForm(true);
  };

  const updateCourse = () => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === editingCourse.id
          ? { ...course, title: newCourse.title, description: newCourse.description }
          : course
      )
    );
    setEditingCourse(null);
    setNewCourse({ title: '', description: '' });
    setShowForm(false);
  };

  const deleteCourse = (id) => {
    setCourses((prev) => prev.filter((course) => course.id !== id));
  };

  return (
    <div className="courses-page">
      <header className="courses-header">
        <h2>Kurs Yönetimi</h2>
        <p>Bu sayfada kurs ekleyebilir, düzenleyebilir veya silebilirsiniz.</p>
        <button className="toggle-form-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Formu Kapat' : 'Yeni Kurs Ekle'}
        </button>
      </header>
      {showForm && (
        <div className="course-form">
          <input
            type="text"
            name="title"
            placeholder="Kurs Başlığı"
            value={newCourse.title}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            placeholder="Kurs Açıklaması"
            value={newCourse.description}
            onChange={handleInputChange}
          />
          {editingCourse ? (
            <button className="save-btn" onClick={updateCourse}>Kursu Güncelle</button>
          ) : (
            <button className="save-btn" onClick={addCourse}>Kursu Ekle</button>
          )}
        </div>
      )}
      <section className="courses-list">
        {courses.length === 0 ? (
          <p className="no-courses">Henüz kursunuz yok.</p>
        ) : (
          <ul>
            {courses.map((course) => (
              <li key={course.id} className="course-card">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="course-actions">
                  <button className="edit-btn" onClick={() => editCourse(course)}>Düzenle</button>
                  <button className="delete-btn" onClick={() => deleteCourse(course.id)}>Sil</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default CoursesPage;
