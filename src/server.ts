import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import { client } from './app';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'https://pfpguessr.com'],
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  const url = socket.handshake.headers.referer;
  if (!url) return socket.disconnect();

  let user: string = socket.handshake.query.twitch as string;

  if (!user) return socket.disconnect;

  client.join(`#${user}`).catch((err) => console.log(err));

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const port = process.env.PORT || 1337;
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

export { io };
