// src/EventAndContact.js

import React from "react";
import "./EventAndContact.css";

function EventAndContact() {
  return (
    <div className="event-and-contact">
      <div className="events">
        <h2>SOME OF OUR EVENTS</h2>
        <div className="event">
          <div className="date">
            <div>05</div>
            <div>May</div>
          </div>
          <div className="details">
            <h3>Education Exhibition of Azerbaijan Universities</h3>
            <p>
              May 5, 2019 from 12:00 to 18:00 at Park Inn Hotel An educational
              exhibition of Azerbaijani universities will be held. Participation
              in the exhibition is free of charge.
            </p>
            <p>
              <i className="fa fa-clock"></i> 12:00-18:00 &nbsp;{" "}
              <i className="fa fa-map-marker"></i> Park inn Hotel
            </p>
          </div>
        </div>
        <div className="event">
          <div className="date">
            <div>07</div>
            <div>Feb</div>
          </div>
          <div className="details">
            <h3>Victory Courses visited the disabled children's home</h3>
            <p>
              The team of Victory Courses visited the disabled children's home
              located in Mardakan.
            </p>
            <p>
              <i className="fa fa-clock"></i> 12:00 &nbsp;{" "}
              <i className="fa fa-map-marker"></i> Mərdəkan
            </p>
          </div>
        </div>
        <div className="event">
          <div className="date">
            <div>20</div>
            <div>Yan</div>
          </div>
          <div className="details">
            <h3>January 20 - National Day of Mourning</h3>
            <p>
              On January 20, a commemorative ceremony was held in Victory
              Courses and the martyrs were commemorated.
            </p>
            <p>
              <i className="fa fa-clock"></i>In all branches
            </p>
          </div>
        </div>
      </div>
      <div className="contact-forms">
        <h2>ONLINE APPLICATION</h2>
        <form>
          <input type="text" placeholder="Name and Surname" />
          <select>
            <option value="">
              Select a service
            </option>
            <option value="">General</option>
            {/* Add options here */}
          </select>
          <input type="text" placeholder="Phone" />
          <input type="email" placeholder="E-mail" />
          <textarea placeholder="Write your message"></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default EventAndContact;
