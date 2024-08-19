import React from 'react';
import './School.css';

const School = () => {
    return (
        <div className="school-container">
            <h1 className="title">High School and College Preparation</h1>
            <div className="stages">
                <div className="stage">
                    <h2>Academic Counseling</h2>
                    <p>Receive expert guidance on course selection, improving grades, and preparing for college entrance exams.</p>
                </div>
                <div className="stage">
                    <h2>Test Preparation</h2>
                    <p>Comprehensive preparation for standardized tests like SAT and ACT through courses and practice exams.</p>
                </div>
                <div className="stage">
                    <h2>Career Counseling</h2>
                    <p>Explore various career paths that align with your interests and strengths.</p>
                </div>
                <div className="stage">
                    <h2>College Application Process</h2>
                    <p>Assistance with application forms, essay writing, recommendation letters, and interview preparation.</p>
                </div>
                <div className="stage">
                    <h2>Extracurricular Activities</h2>
                    <p>Engage in sports, arts, volunteer work, and other activities to develop your skills and interests.</p>
                </div>
            </div>
        </div>
    );
}

export default School;
