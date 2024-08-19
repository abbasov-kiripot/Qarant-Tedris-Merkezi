import React from 'react';
import './Physical.css';

const Physical = () => {
  return (
    <div className="physical-container">
      <h1 className="physical-title">Fiziksel Eğitim Programı</h1>
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
    topics: ["Temel Egzersizler", "Kuvvet Antrenmanı", "Dayanıklılık"], 
    description: "Bu ay, temel egzersizler ve kuvvet antrenmanı üzerinde durulacaktır. Dayanıklılık geliştirme yöntemleri öğretilecektir." 
  },
  { 
    name: "Ekim", 
    topics: ["Koşu Teknikleri", "Esneklik", "Vücut Ağırlığı Egzersizleri"], 
    description: "Koşu teknikleri ve esneklik çalışmaları üzerinde durulacak, vücut ağırlığı egzersizleri uygulanacaktır." 
  },
  { 
    name: "Kasım", 
    topics: ["Ağırlık Çalışmaları", "Kardiyo", "Fonksiyonel Egzersizler"], 
    description: "Ağırlık çalışmaları, kardiyo egzersizleri ve fonksiyonel egzersizler üzerinde durulacaktır." 
  },
  { 
    name: "Aralık", 
    topics: ["Spor Yaralanmaları", "Rehabilitasyon", "Kas Güçlendirme"], 
    description: "Spor yaralanmalarının önlenmesi ve rehabilitasyon süreçleri, kas güçlendirme teknikleri ele alınacaktır." 
  },
  { 
    name: "Ocak", 
    topics: ["Spor Bilgisi", "Antrenman Planlaması", "Beslenme"], 
    description: "Spor bilgisi, antrenman planlaması ve beslenme konularına giriş yapılacak ve detaylı olarak işlenecektir." 
  },
  { 
    name: "Şubat", 
    topics: ["Yüzme Teknikleri", "Açık Hava Egzersizleri", "Kardiyovasküler Sağlık"], 
    description: "Yüzme teknikleri, açık hava egzersizleri ve kardiyovasküler sağlık konuları ele alınacaktır." 
  },
  { 
    name: "Mart", 
    topics: ["Takım Sporları", "Strateji Geliştirme", "Rekabetçi Antrenmanlar"], 
    description: "Takım sporları, strateji geliştirme ve rekabetçi antrenmanlar üzerinde durulacaktır." 
  },
  { 
    name: "Nisan", 
    topics: ["Yoga", "Pilates", "Esneklik Çalışmaları"], 
    description: "Yoga, pilates ve esneklik çalışmaları kapsamlı bir şekilde ele alınacaktır." 
  },
  { 
    name: "Mayıs", 
    topics: ["Spor Bilimleri", "Performans Analizi", "Spor Psikolojisi"], 
    description: "Spor bilimleri, performans analizi ve spor psikolojisi konuları ayrıntılı olarak ele alınacaktır." 
  }
];

export default Physical;
