import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>

      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      
      <Navbar setShowLogin={setShowLogin} />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
