import React from 'react';
import './Chemical.css';

const Chemical = () => {
  return (
    <div className="chemical-container">
      <h1 className="chemical-title">Kimya Kursu Programı</h1>
      <div className="months-container">
        {months.map((month, index) => (
          <div key={index} className="month-card">
            <h2>{month.name}</h2>
            <ul>
              {month.topics.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))}
            </ul>
            <p className="month-description">{month.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const months = [
  { 
    name: "Eylül", 
    topics: ["Temel Kimya Kavramları", "Atom ve Moleküller", "Periyodik Tablo"], 
    description: "Bu ay, temel kimya kavramları, atom ve moleküller ile periyodik tablo hakkında bilgiler verilecektir." 
  },
  { 
    name: "Ekim", 
    topics: ["Kimyasal Bağlar", "Kimyasal Reaksiyonlar", "Asitler ve Bazlar"], 
    description: "Kimyasal bağlar, reaksiyonlar ve asit-baz kimyası üzerinde durulacaktır." 
  },
  { 
    name: "Kasım", 
    topics: ["Organik Kimya", "Karbon Kimyası", "Alkanlar ve Alkenler"], 
    description: "Organik kimya, karbon kimyası ve alkanlar, alkenler konuları işlenecektir." 
  },
  { 
    name: "Aralık", 
    topics: ["Termokimya", "Kimyasal Denge", "Kinetik Teori"], 
    description: "Termokimya, kimyasal denge ve kinetik teori konuları ayrıntılı olarak ele alınacaktır." 
  },
  { 
    name: "Ocak", 
    topics: ["Elektrokimya", "Kimyasal Analiz", "Organik Bileşikler"], 
    description: "Elektrokimya, kimyasal analiz yöntemleri ve organik bileşikler konuları işlenecektir." 
  },
  { 
    name: "Şubat", 
    topics: ["Sulu Çözeltiler", "Titrasyon", "Kimyasal Enerji"], 
    description: "Sulu çözeltiler, titrasyon yöntemleri ve kimyasal enerji konuları ele alınacaktır." 
  },
  { 
    name: "Mart", 
    topics: ["Koordinasyon Kimyası", "Kimyasal Kinetik", "Spektroskopi"], 
    description: "Koordinasyon kimyası, kimyasal kinetik ve spektroskopi konuları işlenecektir." 
  },
  { 
    name: "Nisan", 
    topics: ["Polimerler", "Kimyasal Teknoloji", "Yeşil Kimya"], 
    description: "Polimerler, kimyasal teknoloji ve yeşil kimya konuları kapsamlı bir şekilde ele alınacaktır." 
  },
  { 
    name: "Mayıs", 
    topics: ["Nükleer Kimya", "Analitik Kimya", "Kimyasal Riskler"], 
    description: "Nükleer kimya, analitik kimya ve kimyasal riskler konuları ayrıntılı olarak ele alınacaktır." 
  }
];

export default Chemical;
