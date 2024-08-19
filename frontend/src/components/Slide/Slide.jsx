import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import "./Slide.css";

export default function Slide() {
  return (
    <>
      <Swiper
        className="mySwiper"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        <SwiperSlide>
          <div className="slide-container">
            <img
              src="https://i.pinimg.com/originals/7c/b2/c4/7cb2c478c05b7d7b8c204078645ea784.jpg"
              alt="Slide 1"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-container">
            <img
              src="https://silt.mgu.ac.in/wp-content/uploads/2017/09/slider-01.jpg"
              alt="Slide 2"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-container">
            <img
              src="https://e-school.org.in/uploads/slider/1614269389bg3.jpg"
              alt="Slide 3"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-container">
            <img
              src="https://www.suraj.ac.in/sitepad-data/uploads/2023/12/slide2.jpg"
              alt="Slide 5"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-container">
            <img
              src="https://e-school.org.in/uploads/slider/1614269396borivali-slider-one.jpg"
              alt="Slide 4"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
