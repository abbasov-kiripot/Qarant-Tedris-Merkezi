import React from 'react';
import './Terms.css'; // Stil vermək üçün ayrıca CSS faylı əlavə edə bilərsiniz

const Terms = () => {
  return (
    <div className="terms-container">
      <h1>Qaydalar və Şərtlər</h1>
      
      <section className="terms-section">
        <h2>1. Giriş</h2>
        <p>
          Bu qaydalar və şərtlər, bu saytdan və ya xidmətlərdən istifadə edərkən sizinlə bizim aramızda bağlanmış bir razılaşmadır. Xahiş edirik, xidmətlərimizdən istifadə etməzdən əvvəl bu qaydalarla tanış olun.
        </p>
      </section>

      <section className="terms-section">
        <h2>2. Xidmətlərdən İstifadə</h2>
        <p>
          Xidmətlərimiz yalnız qanunlara uyğun istifadə üçün nəzərdə tutulub. Hər hansı qanunsuz və ya icazəsiz istifadə ilə bağlı məsuliyyət tamamilə istifadəçinin üzərinə düşür.
        </p>
      </section>

      <section className="terms-section">
        <h2>3. Hesab və Şifrə</h2>
        <p>
          Hesabınızı qorumaq üçün şifrənizi məxfi saxlamalısınız. Hesabınızda baş verən hər hansı hərəkətə görə tam məsuliyyət daşıyırsınız.
        </p>
      </section>

      <section className="terms-section">
        <h2>4. Məlumatın Doğruluğu</h2>
        <p>
          Siz bizə verdiyiniz bütün məlumatların doğru, dəqiq və tam olduğunu təsdiq edirsiniz. Biz yanlış və ya yanıltıcı məlumatlar nəticəsində yaranan hər hansı zərərə görə məsuliyyət daşımırıq.
        </p>
      </section>

      <section className="terms-section">
        <h2>5. Məsuliyyətin Məhdudlaşdırılması</h2>
        <p>
          Biz heç bir halda xidmətlərimizdən istifadəniz zamanı hər hansı birbaşa, dolayı və ya təsadüfi zərər üçün məsuliyyət daşımırıq.
        </p>
      </section>

      <section className="terms-section">
        <h2>6. Qaydaların Dəyişdirilməsi</h2>
        <p>
          Bu qaydaları və şərtləri istənilən vaxt xəbərdarlıq etmədən yeniləyə və ya dəyişdirə bilərik. İstifadəçilər bu dəyişikliyi nəzərdən keçirmək üçün mütəmadi olaraq saytı yoxlamalıdır.
        </p>
      </section>

      <section className="terms-section">
        <h2>7. Əlaqə</h2>
        <p>
          Əgər bu qaydalar və şərtlərlə bağlı hər hansı sualınız varsa, xahiş edirik bizimlə əlaqə saxlayın.
        </p>
      </section>
    </div>
  );
};

export default Terms;
