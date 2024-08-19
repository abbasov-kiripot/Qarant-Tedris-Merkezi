import React from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExamInfo from "../../components/ExamInfo/ExamInfo";
import Slide from "../../components/Slide/Slide";
import Services from "../../components/Services/services";
import EventAndContact from "../../components/EventAndContact/EventAndContact";
import Card from "../../components/Card/Card";

const Home = () => {
  return (
    <div>
      <Header />
      <ExamInfo />
      <Services />
      <Slide />
      <EventAndContact />
      <Card />
    </div>
  );
};

export default Home;
