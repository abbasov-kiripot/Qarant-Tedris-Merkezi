import React from 'react';
import './FLT.css';

const FLT = () => {
    return (
        <div className="flt-container">
            <h1 className="title">Foreign Language Training</h1>
            <div className="stages">
                <div className="stage">
                    <h2>Language Courses</h2>
                    <p>Enroll in structured courses through language schools or online platforms to learn a new language.</p>
                </div>
                <div className="stage">
                    <h2>Language Practice</h2>
                    <p>Join conversation clubs and language exchange programs to practice speaking.</p>
                </div>
                <div className="stage">
                    <h2>Test Preparation</h2>
                    <p>Prepare for language proficiency tests like TOEFL and IELTS with dedicated courses.</p>
                </div>
                <div className="stage">
                    <h2>Cultural Education</h2>
                    <p>Understand the cultural context of the language and improve cultural awareness.</p>
                </div>
                <div className="stage">
                    <h2>Self-Study</h2>
                    <p>Use mobile apps, books, videos, and other resources for independent language learning.</p>
                </div>
                <div className="stage">
                    <h2>Overseas Experience</h2>
                    <p>Travel or live abroad to immerse yourself in the language and culture.</p>
                </div>
            </div>
        </div>
    );
}

export default FLT;
