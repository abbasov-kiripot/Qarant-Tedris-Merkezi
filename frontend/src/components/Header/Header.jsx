import React from 'react'
import "./Header.css"
import { useNavigate } from 'react-router'

const Header = () => {

  const navigate = useNavigate();

  return (
    <div>
      <div className="header">
        <div className="header-contents">
            <h2>Get your online exam trial ticket!</h2>
            <p>Get your free online exam trial ticket and test your knowledge, register now!</p>
            <button onClick={()=>navigate("/PlaceOrder")} >View Ticket</button>
        </div>
      </div>
    </div>
  )
}

export default Header
