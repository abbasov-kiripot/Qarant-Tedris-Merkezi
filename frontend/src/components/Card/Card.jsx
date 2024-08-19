import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Swiper CSS dosyasını ekleyin
import 'swiper/css/autoplay'; // Autoplay modülü için CSS ekleyin
import { Autoplay } from 'swiper/modules'; // Autoplay modülünü doğru şekilde import edin
import './Card.css';

const Card = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);

  const getData = async () =>{
    try {
      const response = await fetch('http://localhost:8080/api/cards').then(x=>x.json()).then(c=> setCards(c))
    } catch (error) {
      console.error('Error fetching cards:', error);
      throw error;
    }
  }
  useEffect(() => {
    // İlk kartları yükle
    getData()
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="cards">
      <h2>SOME OF OUR ACHIEVEMENTS</h2>
      <Swiper
        className="swiper-container"
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]} // Autoplay modülünü kullanın
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
      >
        {cards.map((card) => (
          <SwiperSlide key={card._id}>
            <div className="card">
              <img src={card.imageUrl} alt={card.title} className="card-image" />
              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Card;
