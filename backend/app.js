import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { connect } from 'mongoose';
import cardRoutes from './routes/cardRoutes.js';  // Default import

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

const DB_URL = "mongodb+srv://QarantTedrisMerkezi2024:Qarant2024@cluster0.84ee93e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

connect(DB_URL)
  .then(() => console.log("Connected to MongoDB!"))
  .catch(error => console.error("Connection error:", error));

app.use('/api/cards', cardRoutes); // Card routes ekleniyor

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('cardUpdated', (card) => {
    io.emit('updateCards', card);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Your App is running on port ${PORT}`);
});
