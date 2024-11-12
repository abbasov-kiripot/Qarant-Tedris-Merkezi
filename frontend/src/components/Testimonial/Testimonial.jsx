import React from 'react';
import './Testimonial.css';

const testimonials = [
    {
        id: 1,
        name: "İslam Süleymanov",
        text: "IT Brains Academy-də təhsil aldığım müddətdə istər akademiyanın komanda heyətindən, istərsə də təlimçidən çox razı qaldım. Burada öyrənmək üçün bütün şərait var.",
        imageUrl: "https://itbrains.edu.az/src/img/Students/34c859e9-15d0-4a3c-8df9-0943a9e1f19eP1170826-compressed.jpg",
    },
    {
        id: 2,
        name: "Əzizə Ramazanlı",
        text: "IT Brains Academy-də dərslərin yüksək səviyyədə keçirilməsi üçün yaradılan şərait məni qane etdi. Həm müəllim heyətinin, həm də işçi kollektivinin bütün tələbələrə ayrılıqda yanaşması, bizlərlə yaxından maraqlanmaları çox xoş idi.",
        imageUrl: "https://itbrains.edu.az/src/img/Students/8f2178b7-3832-4040-914d-272faf319676P1170465-compressed.jpg",
    },
    {
        id: 3,
        name: "Leyla Ənnəgiyeva",
        text: "Burada keçirilən dərslərin əsas üstünlüyü həm praktiki, həm də nəzəri formada bir-biri ilə uyğunlaşmasıdır. Təhsil aldığım müddətdə real layihələr üzərində işlədiyim üçün məni daha çox inkişaf etdirdi.",
        imageUrl: "https://itbrains.edu.az/src/img/Students/71c70805-5f0b-45ef-a0b4-39811e9816a0d42e12ae-b030-47aa-ae31-f6ea5ffd5400.jpg",
    }
];

const Testimonial = () => {
    return (
        <div className="testimonial-container">
            {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="testimonial-card">
                    <img src={testimonial.imageUrl} alt={testimonial.name} className="testimonial-image" />
                    <p className="testimonial-text">{testimonial.text}</p>
                    <h4 className="testimonial-name">{testimonial.name}</h4>
                </div>
            ))}
        </div>
    );
};

export default Testimonial;
