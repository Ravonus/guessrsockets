import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

export let begin = '';

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'https://pfpguessr.com'],
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  begin = socket.id;

  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const port = process.env.PORT || 1337;
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

export { io }; // Export the io instance
