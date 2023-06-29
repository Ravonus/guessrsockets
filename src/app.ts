import tmi from 'tmi.js';
import env from 'dotenv';
import { io } from './server'; // Import the io instance

env.config();

const options = {
  options: { debug: true },
  connection: {
    secure: true,
    reconnect: true,
  },
  identity: {
    username: process.env.TWITCH_USER,
    password: process.env.TWITCH_OAUTH,
  },
  channels: [],
};

export const client = tmi.client(options);

client.connect();

client.on('message', (channel, userstate, message, self) => {
  if (
    message.toLowerCase().includes('azuki') ||
    message.toLowerCase().includes('elemental') ||
    message.toLowerCase().includes('0') ||
    message.toLowerCase().includes('1')
  ) {
    console.log(
      'Azuki or Elemental was mentioned by ' + userstate['display-name'],
      channel
    );

    const isAzuki =
      message.toLowerCase().includes('azuki') ||
      message.toLowerCase().includes('0')
        ? true
        : false;
    //emit to just being
    const socket = channel.replace('#', '');
    io.emit(socket, {
      user: userstate['display-name'],
      isAzuki,
    });
  }
});
