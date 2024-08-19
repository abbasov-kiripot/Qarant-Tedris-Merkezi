import React from 'react';
import './Program.css';

const Program = () => {
    return (
        <div className="miq-container">
            <h1 className="title">Ofis Proqramları</h1>
            <div className="stages">
                <div className="stage">
                    <h2>Proqram Məsləhətləri</h2>
                    <p>Ofis proqramları üçün effektiv istifadə məsləhətləri.</p>
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
                    <p>Ofis proqramları üçün tədris materialları və dərslər.</p>
                </div>
                <div className="stage">
                    <h2>İşçilərə Məsləhətlər</h2>
                    <p>İşçilər üçün ofis proqramlarının istifadəsi haqqında məsləhətlər.</p>
                </div>
                <div className="stage">
                    <h2>Fəaliyyətlər</h2>
                    <p>Ofis proqramları ilə bağlı faydalı fəaliyyətlər və təcrübələr.</p>
                </div>
            </div>
        </div>
    );
}

export default Program;
