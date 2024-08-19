import React from 'react';
import './Maths.css';

const Maths = () => {
  return (
    <div className="maths-container">
      <h1 className="maths-title">Matematik Kursu Programı</h1>
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
    topics: ["Temel Kavramlar", "Doğal Sayılar", "Tam Sayılar"], 
    description: "Bu ay, temel matematik kavramları ve doğal sayılar üzerinde durulacaktır. Tam sayılarla ilgili temel işlemler öğretilecektir." 
  },
  { 
    name: "Ekim", 
    topics: ["Kesirler", "Ondalık Kesirler", "Rasyonel Sayılar"], 
    description: "Kesirler ve ondalık kesirlerin yanı sıra, rasyonel sayıların kullanımı ve işlemleri öğrenilecektir." 
  },
  { 
    name: "Kasım", 
    topics: ["Üslü Sayılar", "Köklü Sayılar", "Çarpanlara Ayırma"], 
    description: "Üslü ve köklü sayıların temel prensipleri ve çarpanlara ayırma teknikleri üzerinde durulacaktır." 
  },
  { 
    name: "Aralık", 
    topics: ["Denklemler", "Eşitsizlikler", "Mutlak Değer"], 
    description: "Denklem ve eşitsizliklerin çözümü ve mutlak değer kavramı ayrıntılı olarak ele alınacaktır." 
  },
  { 
    name: "Ocak", 
    topics: ["Fonksiyonlar", "Polinomlar", "Logaritma"], 
    description: "Fonksiyonlar, polinomlar ve logaritma konularına giriş yapılacak ve bu konular derinlemesine işlenecektir." 
  },
  { 
    name: "Şubat", 
    topics: ["Karmaşık Sayılar", "Trigonometri", "Dizi ve Seriler"], 
    description: "Karmaşık sayılar ve trigonometri temel alınacak, dizi ve seriler konusu ele alınacaktır." 
  },
  { 
    name: "Mart", 
    topics: ["Analitik Geometri", "Çember ve Daire", "Katı Cisimler"], 
    description: "Analitik geometri, çember ve daire konuları işlenecek ve katı cisimlerin temel özellikleri öğretilecektir." 
  },
  { 
    name: "Nisan", 
    topics: ["Permütasyon", "Kombinasyon", "Olasılık"], 
    description: "Permütasyon ve kombinasyon konuları işlenecek, olasılık hesaplamalarına giriş yapılacaktır." 
  },
  { 
    name: "Mayıs", 
    topics: ["Limit ve Süreklilik", "Türev", "İntegral"], 
    description: "Limit ve süreklilik, türev ve integral konuları kapsamlı bir şekilde ele alınacaktır." 
  }
];

export default Maths;
