import React, { useState, useEffect } from 'react';
import './StudentManagement.css';

// Input alanı bileşeni
const InputField = ({ label, type, name, value, onChange, required }) => (
  <div>
    <label>{label} :</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

// Ders programı girişi bileşeni
const ScheduleInputField = ({ day, subject, startTime, endTime, location, onChange }) => (
  <div className="schedule-input">
    <InputField label="Gün" type="text" name="day" value={day} onChange={onChange} required />
    <InputField label="Ders Adı" type="text" name="subject" value={subject} onChange={onChange} required />
    <InputField label="Başlangıç Saati" type="time" name="startTime" value={startTime} onChange={onChange} required />
    <InputField label="Bitiş Saati" type="time" name="endTime" value={endTime} onChange={onChange} required />
    <InputField label="Yer" type="text" name="location" value={location} onChange={onChange} required />
  </div>
);

const StudentManagement = () => {
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    mobile: '',
    address: '',
    group: '',
    branch: '',
    subjects: [],
    imageUrl: '',
    gender: 'male',
    schedule: [{ day: '', subject: '', startTime: '', endTime: '', location: '' }]
  });

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Öğrencileri veritabanından getir
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/profiles');
        const data = await response.json();
        setStudents(data || []);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleScheduleChange = (index, e) => {
    const { name, value } = e.target;
    const newSchedule = [...profileData.schedule];
    newSchedule[index] = { ...newSchedule[index], [name]: value };
    setProfileData({ ...profileData, schedule: newSchedule });
  };

  const handleAddSchedule = () => {
    setProfileData({
      ...profileData,
      schedule: [...profileData.schedule, { day: '', subject: '', startTime: '', endTime: '', location: '' }]
    });
  };

  const handleRemoveSchedule = (index) => {
    const newSchedule = profileData.schedule.filter((_, i) => i !== index);
    setProfileData({ ...profileData, schedule: newSchedule });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Resim yükleme işlemi
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'tbrgiuze');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/de6kealil/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setProfileData({ ...profileData, imageUrl: data.secure_url });
    } catch (error) {
      console.error('Resim yükleme hatası:', error);
      setErrorMessage('Resim yüklenirken bir hata oluştu.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId
      ? `http://localhost:8080/api/profiles/${editingId}`
      : 'http://localhost:8080/api/profiles';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      });

      const data = await response.json();

      if (response.ok) {
        alert(editingId ? 'Profil başarıyla güncellendi!' : 'Profil başarıyla eklendi!');

        // Profil alanlarını sıfırla
        setProfileData({
          fullName: '',
          email: '',
          phone: '',
          mobile: '',
          address: '',
          group: '',
          branch: '',
          subjects: [],
          imageUrl: '',
          gender: 'male',
          schedule: [{ day: '', subject: '', startTime: '', endTime: '', location: '' }]
        });

        setStudents((prev) =>
          editingId ? prev.map(student => student._id === editingId ? data : student) : [...prev, data]
        );
        setEditingId(null);
      } else {
        setErrorMessage(data.message || 'Profil ekleme/güncelleme hatası.');
      }
    } catch (error) {
      console.error('Profil ekleme/güncelleme hatası:', error);
      setErrorMessage('Profil ekleme/güncelleme başarısız oldu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  // Profil silme işlemi
  const handleDelete = async (id) => {
    if (window.confirm('Bu profili silmek istediğinize emin misiniz?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/profiles/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          setStudents(students.filter(student => student._id !== id));
        } else {
          const data = await response.json();
          setErrorMessage(data.message || 'Profil silme hatası.');
        }
      } catch (error) {
        console.error('Profil silme hatası:', error);
      }
    }
  };

  const handleEdit = (student) => {
    setProfileData(student);
    setEditingId(student._id);
  };

  const filteredStudents = students.filter(student =>
    student && student.fullName && student.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='forum-container'>
      <h2>Profil Bilgileri</h2>

      <input
        type="text"
        placeholder="Tam isimle arama yap..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />

      <form onSubmit={handleSubmit}>
        <InputField
          label="Ad Soyad"
          type="text"
          name="fullName"
          value={profileData.fullName}
          onChange={handleInputChange}
          required
        />
        <InputField
          label="Email"
          type="email"
          name="email"
          value={profileData.email}
          onChange={handleInputChange}
          required
        />
        <InputField
          label="Əlaqə Nömrəsi"
          type="tel"
          name="phone"
          value={profileData.phone}
          onChange={handleInputChange}
        />
        <InputField
          label="2-ci əlaqə Nömrəsi"
          type="tel"
          name="mobile"
          value={profileData.mobile}
          onChange={handleInputChange}
        />
        <InputField
          label="Ünvanı"
          type="text"
          name="address"
          value={profileData.address}
          onChange={handleInputChange}
        />
        <InputField
          label="Grubu"
          type="text"
          name="group"
          value={profileData.group}
          onChange={handleInputChange}
        />
        <InputField
          label="İxtisası"
          type="text"
          name="branch"
          value={profileData.branch}
          onChange={handleInputChange}
        />
        <InputField
          label="Cinsiyet"
          type="text"
          name="gender"
          value={profileData.gender}
          onChange={handleInputChange}
        />
        <InputField
          label="Oxuduğu Dərslər"
          type="text"
          name="subjects"
          value={profileData.subjects}
          onChange={handleInputChange}
        />
        <label>Profil Şəkli:</label>
        <input type="file" onChange={handleImageUpload} />
        {profileData.imageUrl && <img src={profileData.imageUrl} alt="Profile" width="100" />}
        <h3>Ders Programı</h3>
        {profileData.schedule.map((schedule, index) => (
          <div key={index} className="schedule-container">
            <ScheduleInputField
              {...schedule}
              onChange={(e) => handleScheduleChange(index, e)}
            />
            <button type="button" onClick={() => handleRemoveSchedule(index)}>Kaldır</button>
          </div>
        ))}
        <button type="button" onClick={handleAddSchedule}>Ders Ekle</button>
        <button type="submit" disabled={loading}>
          {editingId ? 'Güncelle' : 'Ekle'}
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>

      <h3>Öğrenciler</h3>
      <ul className="student-list">
        {filteredStudents.map(student => (
          <li key={student._id}>
            {student.fullName}
            <button onClick={() => handleEdit(student)}>Düzenle</button>
            <button onClick={() => handleDelete(student._id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentManagement;
