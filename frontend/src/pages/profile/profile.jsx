import React, { useEffect, useState } from 'react';
import './profile.css';

function Profile() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("profileData");
    if (data) {
      setProfileData(JSON.parse(data)); // LocalStorage'dan verileri al ve state'e kaydet
    } else {
      console.error("Profil verileri bulunamadı.");
    }
  }, []);

  if (!profileData) {
    return <p>Profil bilgileri yükleniyor...</p>; // Veriler yüklenirken bekleme mesajı
  }

  return (
    <div className="profile-container">
      {/* Sol Profil Kartı */}
      <div className="left-card">
        <div className="avatar">
          <img src={profileData.avatarUrl || "https://img.freepik.com/free-photo/close-up-beautiful-woman-smiling_23-2148369437.jpg"} alt="profile" />
        </div>
        <h2 className="name">{profileData.fullName || "Kullanıcı Adı"}</h2>
        <p className="title">{profileData.group || "Pozisyon"}</p>
        <p className="location">{profileData.address || "Lokasyon"}</p>
      </div>

      {/* Sağ Kısım */}
      <div className="right-section">
        {/* İletişim Bilgileri Kartı */}
        <div className="info-card">
          <div className="info-item">
            <span className="label">Ad Soyad </span>
            <span className="value">{profileData.fullName || "Ad Soyad"}</span>
          </div>
          <div className="info-item">
            <span className="label">Əlaqə Nömrəsi</span>
            <span className="value">{profileData.phone || "(XXX) XXX-XXXX"}</span>
          </div>
          <div className="info-item">
            <span className="label">2-ci əlaqə Nömrəsi</span>
            <span className="value">{profileData.mobile || "(XXX) XXX-XXXX"}</span>
          </div>
          <div className="info-item">
            <span className="label">Email</span>
            <span className="value">{profileData.email || "example@example.com"}</span>
          </div>
          <div className="info-item">
            <span className="label">Ünvanı</span>
            <span className="value">{profileData.address || "Ünvan"}</span>
          </div>
          <div className="info-item">
            <span className="label">Oxudugu Dərslər</span>
            <span className="value">{profileData.subjects || "Dərslər"}</span>
          </div>
          <div className="info-item">
            <span className="label">Grupu</span>
            <span className="value">{profileData.group || "Grup"}</span>
          </div>
          <div className="info-item">
            <span className="label">Filial</span>
            <span className="value">{profileData.branch || "Filial"}</span>
          </div>
        </div>

        {/* Sağ Proje Durumu Kartı */}
        <div className="project-card">
          <div className="card-header">
            <span className="assignment-icon">assignment</span>
            <span className="header-text">Project Status</span>
          </div>
          
          <div className="project-items">
            {profileData.projects && profileData.projects.length > 0 ? (
              profileData.projects.map((project, index) => (
                <div className="project-item" key={index}>
                  <span className="project-name">{project.name}</span>
                  <div className="progress-bar">
                    <div className="progress" style={{width: project.progress || '75%'}}></div>
                  </div>
                </div>
              ))
            ) : (
              <p>Proje bilgisi yok.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
