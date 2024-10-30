import React from "react";
import "./OnlineExam.css";
import { BsPersonFillAdd } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";

function OnlineExam() {
  return (
    <div className="exam-App">
      <header className="exam-header">
        <div className="exam-container">
          <h1></h1>
          <div className="options">
            <Link to="/Registration">
              <div className="option new-reg">
                <BsPersonFillAdd />
                <p>Kursa Yeni Qeydiyyat</p>
              </div>
            </Link>
            <Link to="/Results">
              <div className="option results">
                <div className="icon results-icon"></div>
                <IoLogIn />
                <p>Kursa Daxil Ol</p>
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
