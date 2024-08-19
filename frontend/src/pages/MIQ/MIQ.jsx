import React from 'react';
import './MIQ.css';

const MIQ = () => {
    return (
        <div className="miq-container">
            <h1 className="title">Müəllimlərin İşə Qəbuluna Hazırlıq</h1>
            <div className="stages">
                <div className="stage">
                    <h2>Hazırlıq Məsləhətləri</h2>
                    <p>Müəllimlərin işə qəbul imtahanlarına hazırlıq üçün faydalı məsləhətlər.</p>
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
                    <h2>Test Hazırlığı</h2>
                    <p>İşə qəbul imtahanlarına hazırlıq üçün testlər və materiallar.</p>
                </div>
                <div className="stage">
                    <h2>Karyera Məsləhətləri</h2>
                    <p>Müəllimlər üçün karyera məsləhətləri və yol xəritəsi.</p>
                </div>
                <div className="stage">
                    <h2>Özünü İnkişaf</h2>
                    <p>Müəllimlərin şəxsi və peşəkar inkişafı üçün faydalı mənbələr.</p>
                </div>
            </div>
        </div>
    );
}

export default MIQ;
