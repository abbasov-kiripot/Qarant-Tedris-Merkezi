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
          <h1>Q E Y D I Y Y A T</h1>
          <div className="options">
            <Link to="/Registration">
              <div className="option new-reg">
                <BsPersonFillAdd />
                <p>Yeni Qeydiyyat</p>
              </div>
            </Link>
            <Link to="/Results">
              <div className="option results">
                <div className="icon results-icon"></div>
                <GiNotebook />
                <p>Giriş</p>
              </div>
            </Link>
          </div>
          <p className="info">
          </p>
        </div>
      </header>
    </div>
  );
}

export default OnlineExam;
