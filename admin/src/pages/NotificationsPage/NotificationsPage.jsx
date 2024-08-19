import React, { useState } from 'react';
import './NotificationsPage.css'; // CSS dosyasını import et
import { AiOutlineClose } from 'react-icons/ai'; // Kapatma ikonu için

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Yeni Kurs Eklemesi', message: 'Yeni bir kurs eklendi: React ile İleri Seviye.' },
    { id: 2, title: 'Bakım Duyurusu', message: 'Sistemimiz bakım çalışmaları nedeniyle 24 saat süreyle hizmet veremeyecek.' },
    { id: 3, title: 'Kullanıcı Geri Bildirimi', message: 'Kullanıcı geri bildirimleri incelendi ve bazı iyileştirmeler yapılacak.' }
  ]);

  const handleDelete = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  return (
    <div className="notifications-page">
      <h2>Bildirimler</h2>
      <p>Sistem bildirimleri ve duyurular için bu sayfayı kullanın.</p>
      <div className="notifications-list">
        {notifications.length === 0 ? (
          <p className="no-notifications">Henüz bildiriminiz yok.</p>
        ) : (
          notifications.map(notification => (
            <div key={notification.id} className="notification-card">
              <h3>{notification.title}</h3>
              <p>{notification.message}</p>
              <button className="delete-btn" onClick={() => handleDelete(notification.id)}>
                <AiOutlineClose />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NotificationsPage;
