import React from "react";
import "./OnlineExam.css";
import { BsPersonFillAdd } from "react-icons/bs";
import { GiNotebook } from "react-icons/gi";
import { Link } from "react-router-dom";

function OnlineExam() {
  return (
    <div className="exam-App">
      <header className="exam-header">
        <div className="exam-container">
          <h1>Online Telebe Qebulu</h1>
          <div className="options">
            <Link to="/Registration">
              <div className="option new-reg">
                <BsPersonFillAdd />
                <p>New Registration</p>
              </div>
            </Link>
            <Link to="/Results">
              <div className="option results">
                <div className="icon results-icon"></div>
                <GiNotebook />
                <p>Results</p>
              </div>
            </Link>
          </div>
          <p className="info">
            If you pass the exam, enter your work number you can continue from
            there.
          </p>
        </div>
      </header>
    </div>
  );
}

export default OnlineExam;
