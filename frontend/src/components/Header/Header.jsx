import React from 'react'
import "./Header.css"
import { useNavigate } from 'react-router'

const Header = () => {

  const navigate = useNavigate();

  return (
    <div>
      <div className="header">
        <div className="header-contents">
            <h2>Onlayn imtahan sınaq biletinizi elde edin!</h2>
            <p className="regs" >Onlayn imtahan sınaq biletinizi əldə edin və biliklərinizi yoxlayın, indi qeydiyyatdan keçin!</p>
            <button onClick={()=>navigate("/PlaceOrder")} >View Ticket</button>
        </div>
      </div>
    </div>
  )
}

export default Header
