import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <div className="about-us-container">
            <div className="about-us-header">
                <h1>Bizim Haqqımızda</h1>
                <p>Şirketimiz hakkında bilgi edinmek için aşağıdaki alanlara göz atın.</p>
            </div>
            <div className="about-us-content">
                <section className="about-us-section">
                    <h2>Kimik?</h2>
                    <p>Biz, alanında uzman ekibimizle kaliteli hizmet sunmayı amaçlayan bir firmayız. Müşteri memnuniyetini ön planda tutarak, yenilikçi çözümler sunmaktayız.</p>
                </section>
                <section className="about-us-section">
                    <h2>Vizyonumuz</h2>
                    <p>Vizyonumuz, sektörümüzde lider bir firma olarak, müşteri ihtiyaçlarına en iyi şekilde cevap vermek ve sürekli gelişim sağlamak.</p>
                </section>
                <section className="about-us-section">
                    <h2>Değerlerimiz</h2>
                    <ul>
                        <li>İnovasyon</li>
                        <li>Kalite</li>
                        <li>Müşteri Memnuniyeti</li>
                        <li>Şeffaflık</li>
                    </ul>
                </section>
                <section className="about-us-section">
                    <h2>Ekibimiz</h2>
                    <p>Uzman ve deneyimli ekibimiz, her projede en yüksek standartları sağlamak için çalışmaktadır.</p>
                </section>
            </div>
        </div>
    );
}

export default AboutUs;
