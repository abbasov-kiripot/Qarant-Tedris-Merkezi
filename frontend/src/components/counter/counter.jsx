import React, { useEffect } from 'react';
import { AiOutlineBarChart } from "react-icons/ai";
import { FaUserGraduate } from "react-icons/fa6";
import { FaCalendarCheck } from 'react-icons/fa';
import { RxPerson } from "react-icons/rx";

import './counter.css';

const Counter = () => {
  useEffect(() => {
    const countTo = (element, options) => {
      const settings = {
        from: 0,
        to: parseInt(element.dataset.to),
        speed: parseInt(element.dataset.speed),
        refreshInterval: 100,
        decimals: 0,
        formatter: (value) => value.toFixed(0),
        onUpdate: null,
        onComplete: null,
        ...options
      };

      const loops = Math.ceil(settings.speed / settings.refreshInterval);
      const increment = (settings.to - settings.from) / loops;
      let value = settings.from;
      let loopCount = 0;

      const updateTimer = () => {
        value += increment;
        loopCount++;
        element.innerHTML = settings.formatter(value);

        if (settings.onUpdate) {
          settings.onUpdate(value);
        }

        if (loopCount >= loops) {
          clearInterval(intervalId);
          element.innerHTML = settings.formatter(settings.to);
          if (settings.onComplete) {
            settings.onComplete(settings.to);
          }
        }
      };

      const intervalId = setInterval(updateTimer, settings.refreshInterval);
    };

    document.querySelectorAll('.timer').forEach((element) => {
      countTo(element, {
        formatter: (value) => value.toLocaleString()
      });
    });
  }, []);

  return (
    <div className="wrapper" data-aos="fade-down" data-aos-duration="1500" >
      <div className="counter col_fourth">
        <RxPerson className="icon" />
        <h2 className="timer count-title count-number" data-to="300" data-speed="5000"></h2>
        <p className="count-text">Tələbə sayı</p>
      </div>

      <div className="counter col_fourth">
        <AiOutlineBarChart className="icon" />
        <h2 className="timer count-title count-number" data-to="11900" data-speed="4500"></h2>
        <p className="count-text">İştirak dərəcəsi</p>
      </div>

      <div className="counter col_fourth">
        <FaUserGraduate className="icon" />
        <h2 className="timer count-title count-number" data-to="1700" data-speed="4300"></h2>
        <p className="count-text">Məzun</p>
      </div>

      <div className="counter col_fourth end">
        <FaCalendarCheck className="icon" />
        <h2 className="timer count-title count-number" data-to="157" data-speed="4100"></h2>
        <p className="count-text">Keçirilmiş Tədbirlərin Sayı</p>
      </div>
    </div>
  );
};

export default Counter;
