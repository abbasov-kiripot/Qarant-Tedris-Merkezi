import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import './Card.css';

const Card = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/cards');
        const data = await response.json();
        if (response.ok) {
          setCards(data);
        } else {
          console.error('Failed to fetch cards:', data);
        }
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

  // Slider ayarları
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Otomatik kaydırma
    autoplaySpeed: 1000, // Kaydırma hızı (ms)
  };

  return (
    <Slider {...settings} className="card-slider"
      data-aos-duration="1500"
    data-aos="fade-down"  >
      {cards.length > 0 ? (
        cards.map(card => (
          <div key={card._id} className="card">
            <img src={card.imageUrl} alt={card.title} />
            <div className="card-body">
              <h5 className="card-title">{card.title}</h5>
              <p className="card-text">{card.description}</p>
            </div>
            <div className="card-footer">
              <small className="text-muted">Bu Tarixda Yaradılıb {new Date(card.createdAt).toLocaleString()}</small>
            </div>
          </div>
        ))
      ) : (
        <p>No cards available.</p>
      )}
    </Slider>
  );
};

export default Card;
