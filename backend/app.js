import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { connect } from 'mongoose';
import cardRoutes from './routes/cardRoutes.js';  
import examRoutes from './routes/examRoutes.js'; 
import topicRoutes from './routes/topicRoutes.js'; 
import eventRoutes from './routes/eventRoutes.js'; 
import authRoutes from './routes/authRoutes.js'; 
import contactRoutes from './routes/contactRoutes.js'; 
import schoolRoutes from './routes/schoolRoutes.js'; 
import vacanciesRoutes from './routes/jobApplicationRoutes.js'; 

const app = express();
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // CV dosyalarını statik olarak sunma

const DB_URL = "mongodb+srv://QarantTedrisMerkezi2024:Qarant2024@cluster0.84ee93e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB!"))
  .catch(error => console.error("Connection error:", error));

// API rotaları
app.use('/api/cards', cardRoutes); 
app.use('/api/exams', examRoutes); 
app.use('/api/topics', topicRoutes); 
app.use('/api/events', eventRoutes); 
app.use('/api/contacts', contactRoutes); 
app.use('/api/school', schoolRoutes); 
app.use('/api/vacancies', vacanciesRoutes); 

// Auth rotaları
app.use('/api/auth', authRoutes);

io.on('connection', (socket) => {
  console.log('New client connected');

  // Contact güncelleme olayı
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
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Your app is running on port ${PORT}`);
});
