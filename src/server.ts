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
  //check url to see which twitch channel to join/and push too

  const url = socket.handshake.headers.referer;
  if (!url) return console.log('no url');
  console.log(socket.handshake.query);
  let user: string = socket.handshake.query.twitch as string;

  if (!user) return socket.disconnect;

  // const twitch = url.split('?')[1].split('=')[1];
  // console.log('TWITCH CHANNEL: ');
  // console.log(twitch);

  console.log('a user connected', user);

  //join channel
  client.join(`#${user}`);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const port = process.env.PORT || 1337;
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

export { io }; // Export the io instance
