import React from 'react';
import './SchoolPreparation.css';

const SchoolPreparation = () => {
    return (
        <div className="school-preparation-container">
            <h1 className="title">MƏKTƏBƏQƏDƏR HAZIRLIQ</h1>
            <div className="stages">
                <div className="stage">
                    <h2>Hazırlıq Məsləhətləri</h2>
                    <p>Məktəbəqədər uşaqlar üçün hazırlıq məsləhətləri.</p>
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
                    <p>Məktəbəqədər uşaqlar üçün tədris materialları və oyunlar.</p>
                </div>
                <div className="stage">
                    <h2>Valideynlərə Məsləhətlər</h2>
                    <p>Valideynlər üçün məktəbəqədər hazırlıq məsləhətləri.</p>
                </div>
                <div className="stage">
                    <h2>Fəaliyyətlər</h2>
                    <p>Uşaqlar üçün faydalı və maraqlı fəaliyyətlər.</p>
                </div>
            </div>
        </div>
    );
}

export default SchoolPreparation;
