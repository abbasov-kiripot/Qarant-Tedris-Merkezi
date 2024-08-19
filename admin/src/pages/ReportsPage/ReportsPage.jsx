import React, { useState } from 'react';
import './ReportsPage.css'; // CSS dosyasını import et

const ReportsPage = () => {
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (id) => {
    setActiveCard(id === activeCard ? null : id);
  };

  return (
    <div className="reports-page">
      <h2>Raporlar</h2>
      <p>Kurs performansı ve kullanıcı aktiviteleri hakkında raporlar görüntüleyin.</p>
      <div className="reports-content">
        <div
          className={`report-card ${activeCard === 1 ? 'active' : ''}`}
          onClick={() => handleCardClick(1)}
        >
          <h3>Kurs Performansı</h3>
          <p>Son dönemdeki kurs performansınızı analiz edin. Eğitim materyallerinin etkisini ve öğrenci başarılarını gözlemleyin.</p>
          {activeCard === 1 && (
            <div className="report-details">
              <p>Detaylı performans raporu burada gösterilecek...</p>
            </div>
          )}
        </div>
        <div
          className={`report-card ${activeCard === 2 ? 'active' : ''}`}
          onClick={() => handleCardClick(2)}
        >
          <h3>Kullanıcı Aktiviteleri</h3>
          <p>Kullanıcı aktivitelerini izleyin. Hangi içeriklerin popüler olduğunu ve kullanıcıların hangi alanlarda zaman geçirdiğini öğrenin.</p>
          {activeCard === 2 && (
            <div className="report-details">
              <p>Aktivite raporları burada gösterilecek...</p>
            </div>
          )}
        </div>
        <div
          className={`report-card ${activeCard === 3 ? 'active' : ''}`}
          onClick={() => handleCardClick(3)}
        >
          <h3>Genel Bakış</h3>
          <p>Genel bir bakış ile tüm raporları ve trendleri inceleyin. Eğitim sürecinizin genel sağlığını değerlendirin.</p>
          {activeCard === 3 && (
            <div className="report-details">
              <p>Genel raporlar burada gösterilecek...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;
