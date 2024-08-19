import React from 'react';
import './MET.css';
import { Link } from 'react-router-dom';

const topics = [
  { title: 'Matematik', description: 'Denklemler, fonksiyonlar, geometri ve daha fazlası.', link: '/Maths' },
  { title: 'Fizik', description: 'Newton yasaları, termodinamik, optik ve daha fazlası.', link: '/Physical' },
  { title: 'Kimya', description: 'Elementler, bileşikler, reaksiyonlar ve daha fazlası.', link: '/Chemical' },
  { title: 'Biyoloji', description: 'Hücre yapısı, genetik, ekosistemler ve daha fazlası.', link: '/Biology' },
  { title: 'Tarih', description: 'Eski uygarlıklar, dünya savaşları, modern tarih ve daha fazlası.', link: '/tarih' },
  { title: 'Coğrafya', description: 'Fiziksel coğrafya, ekonomik coğrafya, harita bilgisi ve daha fazlası.', link: '/cografya' },
  { title: 'Edebiyat', description: 'Türk edebiyatı, dünya edebiyatı, edebi akımlar ve daha fazlası.', link: '/edebiyat' },
  { title: 'İngilizce', description: 'Dil bilgisi, kelime bilgisi, okuma-anlama ve daha fazlası.', link: '/ingilizce' },
  { title: 'Tarih', description: 'Eski uygarlıklar, dünya savaşları, modern tarih ve daha fazlası.', link: '/tarih' },
  { title: 'Coğrafya', description: 'Fiziksel coğrafya, ekonomik coğrafya, harita bilgisi ve daha fazlası.', link: '/cografya' },
  { title: 'Edebiyat', description: 'Türk edebiyatı, dünya edebiyatı, edebi akımlar ve daha fazlası.', link: '/edebiyat' },
  { title: 'İngilizce', description: 'Dil bilgisi, kelime bilgisi, okuma-anlama ve daha fazlası.', link: '/ingilizce' },
];

const MET = () => {
  return (
    <div className="met-topics">
      {topics.map((topic, index) => (
        <div className="topic-card" key={index}>
          <h3 className="topic-title">{topic.title}</h3>
          <p className="topic-description">{topic.description}</p>
          <Link to={topic.link} className="topic-link-button">Daha Fazla</Link>
        </div>
      ))}
    </div>
  );
};

export default MET;
