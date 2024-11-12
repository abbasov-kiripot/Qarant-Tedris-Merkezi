import React from 'react';
import './Instructors.css'; // CSS dosyasını burada bağlayın

const instructors = [
  { name: 'Səlmi Məhrəmova', title: '', image: 'https://itbrains.edu.az/src/img/teachers/7f6c8772-e488-4426-8b82-ef85d74f3ff9_MG_1819-compressed%20(1).jpg' },
  { name: 'Kamran Nabiyev', title: 'Back-End proqramlaşdırma üzrə təlimçi', image: 'https://itbrains.edu.az/src/img/teachers/eced587c-2db7-42a6-b1cd-695af6ad35f6_MG_1825-compressed.jpg' },
  { name: 'Murad Orucov', title: '', image: 'https://itbrains.edu.az/src/img/teachers/e2757b89-c623-4cd4-8c7c-838aa8b7a3daR%C3%B6ya%20%C4%B0brahimzad%C9%99-compressed.jpg' },
  { name: 'Rəhman Qasımov', title: '', image: 'https://itbrains.edu.az/src/img/teachers/9cb155fa-a483-41d1-8763-a81c698477d9_MG_1887-compressed.jpg' },
  { name: 'İlqar Zərbalıyev', title: '', image: 'https://itbrains.edu.az/src/img/teachers/d61570f8-7a13-4bcd-8f42-ce3dd6d73329_MG_1829-compressed.jpg' },
  { name: 'Fərhad Atakişiyev', title: '', image: 'https://itbrains.edu.az/src/img/teachers/b72a150c-4901-442b-af7e-ed1f64ef9f1cL%C9%99man%20Allahverdiyeva.jpg' },
];

const Instructors = () => {
  return (
    <div className="instructors-container">
      <h2 className="section-title">Təlimçilərimiz</h2>
      <p className="section-description">
      Gələcəyin savadlı kadrı olmağınız üçün sizə dərsləri peşəkar müəllim və mentor heyətimiz tədris edəcək. Yeni biliklər qazanmağınız üçün müəllimlərimiz də daim ixtisas biliklərini təkmilləşdirirlər. Müəllim və mentor heyətimiz öz sahələrini mükəmməl bilməklə yanaşı hər birinin pedoqoji bacarığı da çox yüksəkdir. Sizin üçün çətin görünən mövzuları anlaşıqlı dildə və real layihələr əsasında tədris edəcəklər.
      </p>
      <div className="card-grid">
        {instructors.map((instructor, index) => (
          <div key={index} className="card">
            <img src={instructor.image} alt={instructor.name} className="card-image" />
            <div className="card-overlay">
              <h3 className="card-name">{instructor.name}</h3>
              {instructor.title && <p className="card-title">{instructor.title}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
