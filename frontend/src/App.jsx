// src/App.js
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import MainLayout from "./layout";
import Vacancies from "./pages/Vacancies/Vacancies";
import Contact from "./pages/Contact/Contact";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Registration from "./pages/Registration/Registration";
import OnlineExam from "./pages/OnlineExam/OnlineExam";
import Results from "./pages/Results/Results";
import MED from "./pages/MED/MED";
import MET from "./pages/MET/MET";
import ExamResults from "./pages/ExamResults/ExamResults";
import School from "./pages/School/School";
import Preparation from "./pages/Preparation/Preparation";
import FLT from "./pages/FLT/FLT";
import MIQ from "./pages/MIQ/MIQ";
import SchoolPreparation from "./pages/SchoolPreparation/SchoolPreparation";
import AboutUs from "./pages/AboutUs/AboutUs";
import Tibb from "./pages/Tibb/Tibb";
import Program from "./pages/Program/Program";
import Maths from "./pages/Maths/Maths";
import Physical from "./pages/Physical/Physical";
import Chemical from "./pages/Chemical/Chemical";
import Biology from "./pages/Biology/Biology";
import Login from "./pages/Login/Login";
import Terms from "./pages/Terms/Terms";
import Profile from "./pages/profile/profile";
import GoogleMap from "./components/GoogleMap/GoogleMap";
import Testimonial from "./components/Testimonial/Testimonial";
import Instructors from "./pages/Instructors/Instructors";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/exam" element={<OnlineExam />} />
          <Route path="/Vacancies" element={<Vacancies />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/PlaceOrder" element={<PlaceOrder />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/Results" element={<Results />} />
          <Route path="/MED" element={<MED />} />
          <Route path="/MET" element={<MET />} />
          <Route path="/ExamResults" element={<ExamResults />} />
          <Route path="/School" element={<School />} />
          <Route path="/Preparation" element={<Preparation />} />
          <Route path="/FLT" element={<FLT />} />
          <Route path="/MIQ" element={<MIQ />} />
          <Route path="/SchoolPreparation" element={<SchoolPreparation />} />
          <Route path="/Tibb" element={<Tibb />} />
          <Route path="/Program" element={<Program />} />
          <Route path="/Maths" element={<Maths />} />
          <Route path="/Physical" element={<Physical />} />
          <Route path="/Chemical" element={<Chemical />} />
          <Route path="/Biology" element={<Biology />} />
          <Route path="/Terms" element={<Terms/>}/>
          <Route path="/Profile" element={<Profile/>}/>
          <Route path="/GoogleMap" element={<GoogleMap/>}/>
          <Route path="/Testimonial" element={<Testimonial/>}/>
          <Route path="/Instructors" element={<Instructors/>}/>

        </Route>
      </Routes>
    </div>
  );
};

export default App;
