import React from 'react';
import './Biology.css';

const Biology = () => {
  return (
    <div className="biology-container">
      <h1 className="biology-title">Biyoloji Kursu Programı</h1>
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
    topics: ["Temel Biyoloji Kavramları", "Hücre Yapısı", "Genetik"], 
    description: "Bu ay, temel biyoloji kavramları, hücre yapısı ve genetik konuları üzerinde durulacaktır." 
  },
  { 
    name: "Ekim", 
    topics: ["Metabolizma", "Enzimler", "Hücre Bölünmesi"], 
    description: "Metabolizma, enzimler ve hücre bölünmesi konuları işlenecektir." 
  },
  { 
    name: "Kasım", 
    topics: ["Bitki Biyolojisi", "Hayvan Biyolojisi", "Ekosistemler"], 
    description: "Bitki ve hayvan biyolojisi ile ekosistemler konuları ele alınacaktır." 
  },
  { 
    name: "Aralık", 
    topics: ["Evrim", "Fizyoloji", "Biyomlar"], 
    description: "Evrim, fizyoloji ve biyomlar konuları ayrıntılı olarak incelenecektir." 
  },
  { 
    name: "Ocak", 
    topics: ["Genetik Mühendislik", "Kalıtım", "Moleküler Biyoloji"], 
    description: "Genetik mühendislik, kalıtım ve moleküler biyoloji konuları derinlemesine işlenecektir." 
  },
  { 
    name: "Şubat", 
    topics: ["Ekolojik Denge", "Popülasyon Dinamiği", "Çevre Sorunları"], 
    description: "Ekolojik denge, popülasyon dinamiği ve çevre sorunları konuları ele alınacaktır." 
  },
  { 
    name: "Mart", 
    topics: ["Genetik Hastalıklar", "Küresel Isınma", "Biyoteknoloji"], 
    description: "Genetik hastalıklar, küresel ısınma ve biyoteknoloji konuları üzerinde durulacaktır." 
  },
  { 
    name: "Nisan", 
    topics: ["Viral Hastalıklar", "Immunoloji", "Biyoloji ve Sağlık"], 
    description: "Viral hastalıklar, immunoloji ve biyolojinin sağlık üzerindeki etkileri kapsamlı bir şekilde ele alınacaktır." 
  },
  { 
    name: "Mayıs", 
    topics: ["Gelişen Teknolojiler", "Klinik Biyoloji", "Gelecekte Biyoloji"], 
    description: "Gelişen biyoteknolojiler, klinik biyoloji ve gelecekte biyoloji konuları ayrıntılı olarak incelenecektir." 
  }
];

export default Biology;
