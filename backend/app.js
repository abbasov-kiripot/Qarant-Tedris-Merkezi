import express from 'express'; // Express kütüphanesini içe aktarıyoruz
import cors from 'cors'; // CORS politikalarını yönetmek için cors kütüphanesini içe aktarıyoruz
import http from 'http'; // HTTP sunucusu oluşturmak için içe aktarıyoruz
import path from 'path'; // Dosya yolları ile çalışmak için path kütüphanesini içe aktarıyoruz
import dotenv from 'dotenv';
import { fileURLToPath } from 'url'; // ES modülleri ile dosya yolu işlemleri için kullanılıyor
import { Server } from 'socket.io'; // Socket.IO ile gerçek zamanlı bağlantılar için içe aktarıyoruz
import { connect } from 'mongoose'; // MongoDB bağlantısı için mongoose'u içe aktarıyoruz

// Rota dosyalarını import ediyoruz
import orderRoutes from './routes/orderRoutes.js';
import cardRoutes from './routes/cardRoutes.js';
import examRoutes from './routes/examRoutes.js';
import topicRoutes from './routes/topicRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import schoolRoutes from './routes/schoolRoutes.js';
import vacanciesRoutes from './routes/jobApplicationRoutes.js';
import registrationRoutes from './routes/registrationRoutes.js';
import resultsRoutes from './routes/resultsRoutes.js';
import accountRoutes from './routes/accountRoutes.js'; 
import preparationRoutes from './routes/preparationRoutes.js'; 
import fltRoutes from './routes/fltRoutes.js'; 
import miqRoutes from './routes/miqRoutes.js'; 
import aboutUsRoutes from './routes/aboutUsRoutes.js'; 
import errorHandler from './middleware/errorMiddleware.js'; 
import authRoutes from './models/auth.js'; 
import examResultRoutes from './routes/examResultRoutes.js';


const app = express(); // Express uygulamasını başlatıyoruz
const PORT = process.env.PORT || 8080; // Sunucu portunu ayarlıyoruz
const server = http.createServer(app); // HTTP sunucusu oluşturuyoruz
const io = new Server(server, { // Socket.IO sunucusunu başlatıyoruz
  cors: {
    origin: "*", // Tüm kökenlerden gelen isteklere izin veriyoruz
    methods: ["GET", "POST", "PUT", "DELETE"] // İzin verilen HTTP metotları
  }
});

// __dirname çözümü (ES modüllerine uygun):
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors()); // CORS middleware'ini ekliyoruz
app.use(express.json()); // JSON verilerini parçalayan middleware'i ekliyoruz

// Statik dosyalar için 'uploads' klasörünü ayarlıyoruz
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // 'uploads' klasörünü statik dosya sunumu için ayarlıyoruz

// MongoDB bağlantısı
const DB_URL = "mongodb+srv://QarantTedrisMerkezi2024:Qarant2024@cluster0.84ee93e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }) // MongoDB bağlantısını kuruyoruz
  .then(() => console.log("MongoDB'ye bağlanıldı!")) // Bağlantı başarılıysa mesaj veriyoruz
  .catch(error => {
    console.error("MongoDB bağlantı hatası:", error); // Hata alındıysa mesaj veriyoruz
    process.exit(1); // Uygulama, bağlantı hatası durumunda durdurulacak
  });

// API rotaları
app.use('/api/orders', orderRoutes); // Siparişlerle ilgili işlemler
app.use('/api/cards', cardRoutes); // Kartlarla ilgili işlemler
app.use('/api/exams', examRoutes); // Sınavlarla ilgili işlemler
app.use('/api/topics', topicRoutes); // Konularla ilgili işlemler
app.use('/api/events', eventRoutes); // Etkinliklerle ilgili işlemler
app.use('/api/contacts', contactRoutes); // İletişim bilgileriyle ilgili işlemler
app.use('/api/school', schoolRoutes); // Okul ile ilgili işlemler
app.use('/api/JobApplications', vacanciesRoutes); // İş başvurularıyla ilgili işlemler
app.use('/api/registrations', registrationRoutes); // Kayıtlarla ilgili işlemler
app.use('/api/results', resultsRoutes); // Sonuçlarla ilgili işlemler
app.use('/api/account', accountRoutes); // Hesap yönetimiyle ilgili işlemler
app.use('/api/preparation', preparationRoutes); // Hazırlık süreciyle ilgili işlemler
app.use('/api/flts', fltRoutes); // FLT ile ilgili işlemler
app.use('/api/miq', miqRoutes); // MIQ ile ilgili işlemler
app.use('/api/about-us', aboutUsRoutes); // Hakkımızda sayfası ile ilgili işlemler
app.use('/api/examResults', examResultRoutes); // Sınav sonuçlarıyla ilgili işlemler



// Auth rotaları
app.use('/api/auth', authRoutes); // Kimlik doğrulama işlemleri

// Hata yönetimi
app.use(errorHandler); // Hata yönetimi için middleware

// Socket.IO
io.on('connection', (socket) => { // Socket.IO ile yeni bağlantı
  console.log('Yeni bir istemci bağlandı'); // Yeni bir istemci bağlandığında mesaj veriyoruz

  // İletişim olayları
  socket.on('updateContacts', (contact) => { // İletişim güncelleme olayı
    io.emit('updateContacts', contact); // Tüm istemcilere iletişimi güncelle
  });
  
  dotenv.config(); // Ortam değişkenlerini yükle


  // İletişim silme olayı
  socket.on('deleteContact', (id) => { // İletişim silme olayı
    io.emit('deleteContact', id); // Tüm istemcilere iletişimi sil
  });

  // Okul aşamalarının gerçek zamanlı güncellenmesi
  socket.on('addStage', (stage) => { // Aşama ekleme olayı
    io.emit('addStage', stage); // Tüm istemcilere aşamayı ekle
  });

  socket.on('updateStage', (stage) => { // Aşama güncelleme olayı
    io.emit('updateStage', stage); // Tüm istemcilere aşamayı güncelle
  });

  socket.on('deleteStage', (id) => { // Aşama silme olayı
    io.emit('deleteStage', id); // Tüm istemcilere aşamayı sil
  });

  // İş ilanlarının gerçek zamanlı güncellenmesi
  socket.on('addVacancy', (vacancy) => { // İş ilanı ekleme olayı
    io.emit('addVacancy', vacancy); // Tüm istemcilere iş ilanını ekle
  });

  socket.on('updateVacancy', (vacancy) => { // İş ilanı güncelleme olayı
    io.emit('updateVacancy', vacancy); // Tüm istemcilere iş ilanını güncelle
  });

  socket.on('deleteVacancy', (id) => { // İş ilanı silme olayı
    io.emit('deleteVacancy', id); // Tüm istemcilere iş ilanını sil
  });

  socket.on('disconnect', () => { // İstemci bağlantısı kesildiğinde
    console.log('İstemci bağlantısı kesildi'); // Mesaj veriyoruz
  });
});

// Sunucuyu başlat
server.listen(PORT, () => { // Sunucuyu başlatıyoruz
  console.log(`Sunucu ${PORT} portunda çalışıyor`); // Başarıyla başlatıldığında mesaj veriyoruz
});
