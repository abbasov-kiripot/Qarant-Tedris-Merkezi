import React from 'react';
import { Link } from 'react-router-dom';
import './MED.css';

const exams = [
  { date: '2024-08-01', link: '/exam1', image: 'https://admin.hedef.edu.az/storage/uploads/images/exam-topic/azerbaycan-bolmesi-buraxilis-fenleri-uzre-imtahan-movzulari-mqt-1-1669452479.png' },
  { date: '2024-08-02', link: '/exam2', image: 'https://admin.hedef.edu.az/storage/uploads/images/exam-topic/rus-bolmesi-buraxilis-uzre-mqt-1-imtahan-movzulari-1670403422.png'},
  { date: '2024-08-03', link: '/exam3', image: 'https://admin.hedef.edu.az/storage/uploads/images/exam-topic/azerbaycan-bolmesi-buraxilis-fenleri-uzre-imtahan-movzulari-mqt-1-1669452479.png' },
  { date: '2024-08-04', link: '/exam4', image: 'https://admin.hedef.edu.az/storage/uploads/images/exam-topic/rus-bolmesi-buraxilis-uzre-mqt-1-imtahan-movzulari-1670403422.png' },
  { date: '2024-08-05', link: '/exam5', image: 'https://admin.hedef.edu.az/storage/uploads/images/exam-topic/azerbaycan-bolmesi-buraxilis-fenleri-uzre-imtahan-movzulari-mqt-1-1669452479.png' },
  { date: '2024-08-06', link: '/exam6', image: 'https://admin.hedef.edu.az/storage/uploads/images/exam-topic/rus-bolmesi-buraxilis-uzre-mqt-1-imtahan-movzulari-1670403422.png' },
  { date: '2024-08-07', link: '/exam7', image: 'https://admin.hedef.edu.az/storage/uploads/images/exam-topic/azerbaycan-bolmesi-buraxilis-fenleri-uzre-imtahan-movzulari-mqt-1-1669452479.png' },
  { date: '2024-08-08', link: '/exam8', image: 'https://admin.hedef.edu.az/storage/uploads/images/exam-topic/rus-bolmesi-buraxilis-uzre-mqt-1-imtahan-movzulari-1670403422.png' },
  { date: '2024-08-09', link: '/exam9', image: 'https://admin.hedef.edu.az/storage/uploads/images/exam-topic/azerbaycan-bolmesi-buraxilis-fenleri-uzre-imtahan-movzulari-mqt-1-1669452479.png' },
  { date: '2024-08-10', link: '/exam10', image: 'https://admin.hedef.edu.az/storage/uploads/images/exam-topic/rus-bolmesi-buraxilis-uzre-mqt-1-imtahan-movzulari-1670403422.png' },
  { date: '2024-08-11', link: '/exam11', image: 'https://admin.hedef.edu.az/storage/uploads/images/exam-topic/azerbaycan-bolmesi-buraxilis-fenleri-uzre-imtahan-movzulari-mqt-1-1669452479.png' },
  { date: '2024-08-12', link: '/exam12', image: 'https://admin.hedef.edu.az/storage/uploads/images/exam-topic/rus-bolmesi-buraxilis-uzre-mqt-1-imtahan-movzulari-1670403422.png' },
  { date: '2024-08-13', link: '/exam13', image: 'https://admin.hedef.edu.az/storage/uploads/images/exam-topic/azerbaycan-bolmesi-buraxilis-fenleri-uzre-imtahan-movzulari-mqt-1-1669452479.png' },
  { date: '2024-08-14', link: '/exam14', image: 'https://admin.hedef.edu.az/storage/uploads/images/exam-topic/rus-bolmesi-buraxilis-uzre-mqt-1-imtahan-movzulari-1670403422.png' },
  { date: '2024-08-15', link: '/exam15', image: 'https://admin.hedef.edu.az/storage/uploads/images/exam-topic/azerbaycan-bolmesi-buraxilis-fenleri-uzre-imtahan-movzulari-mqt-1-1669452479.png' },
  { date: '2024-08-16', link: '/exam16', image: 'https://admin.hedef.edu.az/storage/uploads/images/exam-topic/rus-bolmesi-buraxilis-uzre-mqt-1-imtahan-movzulari-1670403422.png' },
];

const ExamDates = () => {
  return (
    <div className="exam-dates">
      {exams.map((exam, index) => (
        <div className="exam-card" key={index}>
          <img src={exam.image} alt={`Exam ${index + 1}`} className="exam-image" />
          <p>İmtahan Tarixi: {exam.date}</p>
          <Link to="/PlaceOrder" className="link-button">
            Link
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ExamDates;
