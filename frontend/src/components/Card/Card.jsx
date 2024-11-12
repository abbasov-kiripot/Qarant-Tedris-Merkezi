import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Card.css';

const Card = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1500 });

    const fetchCards = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/cards');
        const data = await response.json();
        if (response.ok) {
          setCards(data);
        } else {
          throw new Error('Kart verileri alınamadı');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
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
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const openModal = (card) => setSelectedCard(card);
  const closeModal = () => setSelectedCard(null);

  if (loading) {
    return <div className="loading-spinner">Yükleniyor...</div>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div>
      <Slider {...settings} className="card-slider" data-aos="fade-down">
        {cards.length > 0 ? (
          cards.map((card) => (
            <div key={card._id} className="card" onClick={() => openModal(card)}>
              <img
                src={card.imageUrl || 'path/to/default-image.jpg'}
                alt={card.title}
                loading="lazy"
                onError={(e) => { e.target.src = 'path/to/default-image.jpg'; }}
              />
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

      {selectedCard && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedCard.title}</h2>
            <p>{selectedCard.description}</p>
            <button onClick={closeModal}>Kapat</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
