import React from 'react';
import './Preparation.css';

const Preparation = () => {
    return (
        <div className="masters-preparation-container">
            <h1 className="title">Master's Preparation</h1>
            <div className="stages">
                <div className="stage">
                    <h2>Research and Program Selection</h2>
                    <p>Identify master's programs that align with your interests and career goals.</p>
                </div>
                <div className="stage">
                    <h2>Application Process</h2>
                    <p>Get help with application forms, writing statement of purpose, obtaining recommendation letters, and interview preparation.</p>
                </div>
                <div className="stage">
                    <h2>Test Preparation</h2>
                    <p>Prepare for required standardized tests like GRE and GMAT through courses and practice exams.</p>
                </div>
                <div className="stage">
                    <h2>Academic Work</h2>
                    <p>Review undergraduate academic work and develop necessary knowledge and skills for master's studies.</p>
                </div>
                <div className="stage">
                    <h2>Financial Planning</h2>
                    <p>Learn about scholarships, student loans, and other financial resources and apply for them.</p>
                </div>
                <div className="stage">
                    <h2>Career Planning</h2>
                    <p>Define post-master's career goals and plan the steps needed to achieve them.</p>
                </div>
            </div>
        </div>
    );
}

export default Preparation;
