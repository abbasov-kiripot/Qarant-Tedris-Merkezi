import React, { useState, useEffect } from 'react';
import './StudentManagement.css';

const InputField = ({ label, type, name, value, onChange, required }) => (
  <div className="input-field">
    <label>{label} :</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="input"
    />
  </div>
);

const ScheduleInputField = ({ day, subject, startTime, endTime, location, onChange }) => (
  <div className="schedule-input">
    <InputField label="Dərs saat'ı:" type="text" name="day" value={day} onChange={onChange} required />
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
    gender: 'Cinsiyyət',
    schedule: [{ day: '', subject: '', startTime: '', endTime: '', location: '' }],
  });

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);

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
      schedule: [...profileData.schedule, { day: '', subject: '', startTime: '', endTime: '', location: '' }],
    });
  };

  const handleRemoveSchedule = (index) => {
    const newSchedule = profileData.schedule.filter((_, i) => i !== index);
    setProfileData({ ...profileData, schedule: newSchedule });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

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
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(editingId ? 'Profil başarıyla güncellendi!' : 'Profil başarıyla eklendi!');

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
          gender: 'Cinsiyyət',
          schedule: [{ day: '', subject: '', startTime: '', endTime: '', location: '' }],
        });

        setStudents((prev) =>
          editingId ? prev.map((student) => (student._id === editingId ? data : student)) : [...prev, data]
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

  const handleDelete = async (id) => {
    if (window.confirm('Bu profili silmek istediğinize emin misiniz?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/profiles/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setStudents(students.filter((student) => student._id !== id));
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

  const filteredStudents = students.filter(
    (student) =>
      student && student.fullName && student.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="student-management-container">
      <h2>Profil Əlavə Et</h2>

      <input
        type="text"
        placeholder="Tam isimle arama yap..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />

      <form onSubmit={handleSubmit} className="student-form">
        <InputField label="Ad Soyad" type="text" name="fullName" value={profileData.fullName} onChange={handleInputChange}  />
        <InputField label="Email" type="email" name="email" value={profileData.email} onChange={handleInputChange}  />
        <InputField label="Əlaqə Nömrəsi" type="tel" name="phone" value={profileData.phone} onChange={handleInputChange} />
        <InputField label="2-ci əlaqə Nömrəsi" type="tel" name="mobile" value={profileData.mobile} onChange={handleInputChange} />
        <InputField label="Ünvanı" type="text" name="address" value={profileData.address} onChange={handleInputChange} />
        <InputField label="Grubu" type="text" name="group" value={profileData.group} onChange={handleInputChange} />
        <InputField label="Filial" type="text" name="branch" value={profileData.branch} onChange={handleInputChange} />
        <InputField label="Cinsiyyət" type="text" name="gender" value={profileData.gender} onChange={handleInputChange} />
        <InputField label="Oxuduğu Dərslər" type="text" name="subjects" value={profileData.subjects} onChange={handleInputChange} />
        
        <label>Profil Şəkli:</label>
        <input type="file" onChange={handleImageUpload} className="image-upload" />
        {profileData.imageUrl && <img src={profileData.imageUrl} alt="Profile" width="50" className="profile-image" />}

        <h3>Ders Programı</h3>
        {profileData.schedule.map((schedule, index) => (
          <div key={index} className="schedule-container">
            <ScheduleInputField
              day={schedule.day}
              subject={schedule.subject}
              startTime={schedule.startTime}
              endTime={schedule.endTime}
              location={schedule.location}
              onChange={(e) => handleScheduleChange(index, e)}
            />
            <button type="button" onClick={() => handleRemoveSchedule(index)} className="remove-schedule-btn">
              Program Sil
            </button>
          </div>
        ))}

        <button type="button" onClick={handleAddSchedule} className="add-schedule-btn">
          Yeni Ders Programı Ekle
        </button>

        <button type="submit" className="submit-btn" disabled={loading}>
          {editingId ? 'Profili Güncelle' : 'Profili Ekle'}
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>

      <h2>TƏLƏBƏLƏR</h2>
<table className="students-table">
  <thead>
    <tr>
      <th>Ad Soyad</th>
      <th>Email</th>
      <th>Telefon</th>
      <th>2-ci Nömrəsi</th>
      <th>Ünvanı</th>
      <th>Cinsiyyət</th>
      <th>Filial</th>
      <th>Grupu</th>
      <th>Oxuduğu Dərslər</th>
      <th>Profil Resmi</th>
      <th>İşlem</th>
    </tr>
  </thead>
  <tbody>
    {filteredStudents.map((student) => (
      <tr key={student._id}>
        <td>{student.fullName}</td>
        <td>{student.email}</td>
        <td>{student.phone}</td>
        <td>{student.mobile}</td>
        <td>{student.address}</td>
        <td>{student.gender}</td>
        <td>{student.branch}</td>
        <td>{student.group}</td>
        <td>{student.subjects}</td>
        <td>
          {student.imageUrl ? (
            <img className='img-profile-one' src={student.imageUrl} alt="Profil Resmi" />
          ) : (
            "Yok"
          )}
        </td>
        <td>
          <button onClick={() => handleEdit(student)} className="edit-btn">Düzenle</button>
          <button onClick={() => handleDelete(student._id)} className="delete-btn">Sil</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default StudentManagement;
