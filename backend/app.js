import express from 'express';
import cors from 'cors';
import http from 'http';
import path from 'path';  
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import { connect } from 'mongoose';

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
import authRoutes from './middleware/auth.js'; 
import examResultRoutes from './routes/examResultRoutes.js';

const app = express();
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// __dirname çözümü (ES modüllerine uygun):
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Statik dosyalar için 'uploads' klasörünü ayarlıyoruz
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB bağlantısı
const DB_URL = "mongodb+srv://QarantTedrisMerkezi2024:Qarant2024@cluster0.84ee93e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB'ye bağlanıldı!"))
  .catch(error => {
    console.error("MongoDB bağlantı hatası:", error);
    process.exit(1); // Uygulama, bağlantı hatası durumunda durdurulacak
  });

// API rotaları
app.use('/api/orders', orderRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/school', schoolRoutes);
app.use('/api/JobApplications', vacanciesRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/results', resultsRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/preparation', preparationRoutes);
app.use('/api/flts', fltRoutes);
app.use('/api/miq', miqRoutes);
app.use('/api/about-us', aboutUsRoutes);
app.use('/api/examResults', examResultRoutes);

// Auth rotaları
app.use('/api/auth', authRoutes);

// Hata yönetimi
app.use(errorHandler);

// Socket.IO
io.on('connection', (socket) => {
  console.log('Yeni bir istemci bağlandı');

  // Contact olayları
  socket.on('updateContacts', (contact) => {
    io.emit('updateContacts', contact);
  });

  // Contact silme olayı
  socket.on('deleteContact', (id) => {
    io.emit('deleteContact', id);
  });

  // School aşamalarının gerçek zamanlı güncellenmesi
  socket.on('addStage', (stage) => {
    io.emit('addStage', stage);
  });

  socket.on('updateStage', (stage) => {
    io.emit('updateStage', stage);
  });

  socket.on('deleteStage', (id) => {
    io.emit('deleteStage', id);
  });

  // Vacancies başvurularının gerçek zamanlı güncellenmesi
  socket.on('addVacancy', (vacancy) => {
    io.emit('addVacancy', vacancy);
  });

  socket.on('updateVacancy', (vacancy) => {
    io.emit('updateVacancy', vacancy);
  });

  socket.on('deleteVacancy', (id) => {
    io.emit('deleteVacancy', id);
  });

  socket.on('disconnect', () => {
    console.log('İstemci bağlantısı kesildi');
  });
});

// Sunucuyu başlat
server.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
