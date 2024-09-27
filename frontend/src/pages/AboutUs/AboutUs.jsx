import React, { useState, useEffect } from 'react';
import './AboutUs.css';

const AboutUs = () => {
    const [aboutUsData, setAboutUsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // API'den veri çekme
        const fetchAboutUsData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/about-us');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAboutUsData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAboutUsData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="about-us-container">
            <div className="about-us-header">
                <h1>Bizim Haqqımızda</h1>
                <p>Şirketimiz hakkında bilgi edinmek için aşağıdaki alanlara göz atın.</p>
            </div>
            <div className="about-us-content">
                {aboutUsData.map((section, index) => (
                    <section key={index} className="about-us-section">
                        <h2>{section.title}</h2>
                        <p>{section.description}</p>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default AboutUs;
