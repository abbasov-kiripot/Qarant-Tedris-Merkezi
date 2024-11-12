import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
    const sections = [
        {
            title: "Haqqımızda",
            description: `IT Brains Academy-nin ali məqsədi gənclərə və həvəsi olan hər kəsə karyera qurmaq və iş imkanları yaratmaqdır. 
Operativ işləyən komandaya sahib olan IT Brains Academy bu günə qədər minlərlə tələbəyə həm əyani, həm də onlayn formada öz təhsilini vermişdir. 
Eləcə də, adı çəkilən Microsoft, Cisco, CompTIA, Adobe və s. kimi nəhəng şirkətlərin imtahanlarına hazırlıq verərək beynəlxalq sertifikatlı mütəxəssis olmağınıza zəmanət verir. 
IT Brains Academy həmçinin böyük mağaza və video dərslər bazasıdır. Belə ki, burada öyrənmək istədiyiniz sahələrə uyğun siz öz müəllim heyətimizin hazırladığı materiallar və videodərslərlə təmin edilirsiniz. 
Tədris və sistemimizin keyfiyyətini artırmaq məqsədilə IT Brains Academy daim sizin təklif və iradlarınıza məmnuniyyətlə cavab verməyə hazırdır.`,
            imageUrl: "https://images.pexels.com/photos/3182743/pexels-photo-3182743.jpeg", // Haqqımızda bölümünün görseli
        },
        {
            title: "Missiyamız",
            description: `Ölkədə gənclərə IT sahəsi üzrə biliklər qazandırıb biliklərini praktiki olaraq tətbiq etməkdə eləcə də, 
IT sahəsi üzrə təhsil verdiyimiz gənclərə beynəlxalq sertifikatlar qazandırmaqda dəstək olmaqdı.`,
            imageUrl: "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg", // Missiyamız bölümünün görseli
        },
        {
            title: "Vizyonumuz",
            description: `Biz yüksək dərəcədə dürüstlük, sağlam idarəetmə sistemi, peşəkar işçi komandas və müasir tədris metodları ilə 
ölkədə IT sahəsi üzrə qabaqcıl müəssisə kimi tanınmaq və daima inkişaf etmək niyyətindəyik.`,
            imageUrl: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg", // Vizyonumuz bölümünün görseli
        },
    ];

    return (
        <div className="about-us-container">
            {sections.map((section, index) => (
                <div key={index} className={`about-us-section ${index % 2 === 0 ? '' : 'reverse'}`}>
                    <div className="text-content">
                        <h2 className="title">{section.title}</h2>
                        <p>{section.description}</p>
                    </div>
                    <img src={section.imageUrl} alt={section.title} className="about-image" />
                </div>
            ))}
        </div>
    );
};

export default AboutUs;
