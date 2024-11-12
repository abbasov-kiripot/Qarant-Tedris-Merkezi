import React from 'react'
import "./GoogleMap.css"
const GoogleMap = () => {
    return (
        <div className="map-container">
            <iframe
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9008.323712099676!2d50.09334948311802!3d40.448236528442315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4030610002e54c89%3A0x16d2da375b1e5edd!2zSMmZZMmZZiBLaXRhYiBFdmk!5e0!3m2!1str!2saz!4v1725663975334!5m2!1str!2saz"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
            ></iframe>
        </div>
    )
}

export default GoogleMap