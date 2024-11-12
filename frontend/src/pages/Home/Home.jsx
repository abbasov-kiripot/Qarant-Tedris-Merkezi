import React from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExamInfo from "../../components/ExamInfo/ExamInfo";
import Slide from "../../components/Slide/Slide";
import Services from "../../components/Services/services";
import EventAndContact from "../../components/EventAndContact/EventAndContact";
import Card from "../../components/Card/Card";
import Counter from "../../components/counter/counter";
import GoogleMap from "../../components/GoogleMap/GoogleMap";
import Testimonial from "../../components/Testimonial/Testimonial";

const Home = () => {
  return (
    <div>
      <Header />
      <ExamInfo />
      <Services />
      <Testimonial/>
      <Counter />
      <Slide />
      <EventAndContact />
      <Card />
      <GoogleMap />
    </div>
  );
};

export default Home;
