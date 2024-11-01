import React, { useEffect, useState } from 'react';
import './profile.css';

function Profile() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("profileData");
    if (data) {
      setProfileData(JSON.parse(data));
    } else {
      console.error("Profil verileri bulunamadı.");
    }
  }, []);

  if (!profileData) {
    return <p>Profil bilgileri yükleniyor...</p>;
  }

  return (
    <div className="profile-container">
      {/* Sol Profil Kartı */}
      <div className="left-card">
        <div className="avatar">
          {profileData.imageUrl ? (
            <img
              src={profileData.imageUrl}
              alt="Profil resmi"
              className="profile-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "path/to/default-image.jpg";
              }}
            />
          ) : (
            <img src="path/to/default-image.jpg" alt="Varsayılan profil resmi" className="profile-image" />
          )}
        </div>
        <h2 className="name">{profileData.fullName || "Kullanıcı Adı"}</h2>
        <p className="title">{profileData.group || "Pozisyon"}</p>
        <p className="location">{profileData.branch || "Lokasyon"}</p>
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
            <span className="label">Email</span>
            <span className="value">{profileData.email || "example@example.com"}</span>
          </div>
         
          <div className="info-item">
            <span className="label">Cinsiyet</span>
            <span className="value">{profileData.gender || "Cinsiyet"}</span>
          </div>
          <div className="info-item">
            <span className="label">Ünvanı</span>
            <span className="value">{profileData.address || "Ünvan"}</span>
          </div>
          <div className="info-item">
            <span className="label">Əlaqə Nömrəsi</span>
            <span className="value">{profileData.phone || "(XXX) XXX-XXXX"}</span>
          </div>
          <div className="info-item">
            <span className="label">2-ci Əlaqə Nömrəsi</span>
            <span className="value">{profileData.mobile || "(XXX) XXX-XXXX"}</span>
          </div>


          <div className="info-item">
            <span className="label">Oxuduğu Dərslər</span>
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
            <span className="assignment-icon">Həfdəlik dərs programı</span>
            <span className="header-text">Unutmamanızı xaiş edirik</span>
          </div>

          <div className="project-items">
            {profileData.schedule && profileData.schedule.length > 0 ? (
              profileData.schedule.map((schedule, index) => (
                <div key={index} className="project-item">
                  <p><strong>Dərs saat'ı:</strong> {schedule.day}</p>
                  <p><strong>Ders:</strong> {schedule.subject}</p>
                  <p><strong>Otaq:</strong> {schedule.location}</p>
                  <p><strong>Saat:</strong> {schedule.startTime} - {schedule.endTime}</p>
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
