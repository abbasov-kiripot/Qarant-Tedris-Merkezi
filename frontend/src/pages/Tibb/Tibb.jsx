import React from 'react';
import './Tibb.css';

const Tibb = () => {
    return (
        <div className="tibb-container">
            <h1 className="title">Tibb Hazırlığı</h1>
            <div className="stages">
                <div className="stage">
                    <h2>Hazırlıq Məsləhətləri</h2>
                    <p>Tibb hazırlığı üçün effektiv istifadə məsləhətləri.</p>
                </div>
                <div className="stage">
                    <h2>Resurslar</h2>
                    <ul>
                        <li><a href="#!">Resurs 1</a></li>
                        <li><a href="#!">Resurs 2</a></li>
                        <li><a href="#!">Resurs 3</a></li>
                    </ul>
                </div>
                <div className="stage">
                    <h2>Tədris Materialları</h2>
                    <p>Tibb hazırlığı üçün tədris materialları və dərslər.</p>
                </div>
                <div className="stage">
                    <h2>İşçilərə Məsləhətlər</h2>
                    <p>İşçilər üçün tibb proqramlarının istifadəsi haqqında məsləhətlər.</p>
                </div>
                <div className="stage">
                    <h2>Fəaliyyətlər</h2>
                    <p>Tibb hazırlığı ilə bağlı faydalı fəaliyyətlər və təcrübələr.</p>
                </div>
            </div>
        </div>
    );
}

export default Tibb;
