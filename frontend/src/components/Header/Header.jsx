import React from 'react'
import "./Header.css"
import { useNavigate } from 'react-router'

const Header = () => {

  const navigate = useNavigate();

  return (
    <div>
      <div className="header" data-aos="zoom-in" data-aos-duration="1000" >
        <div className="header-contents">
            <h2>Onlayn imtahan sınaq biletinizi əldə edin!</h2>
            <p className="regs" >TƏHSİLDƏ QARANT BİZİK!</p>
            <button onClick={()=>navigate("/PlaceOrder")} >Bilet satışı</button>
        </div>
      </div>
    </div>
  )
}

export default Header
