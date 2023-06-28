"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tmi_js_1 = __importDefault(require("tmi.js"));
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = require("./server"); // Import the io instance
const server_2 = require("./server");
dotenv_1.default.config();
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
    channels: [process.env.TWITCH_CHANNEL],
};
const client = tmi_js_1.default.client(options);
client.connect();
client.on('message', (channel, userstate, message, self) => {
    if (message.toLowerCase().includes('azuki') ||
        message.toLowerCase().includes('elemental') ||
        message.toLowerCase().includes('0') ||
        message.toLowerCase().includes('1')) {
        console.log('Azuki or Elemental was mentioned by ' + userstate['display-name']);
        const isAzuki = message.toLowerCase().includes('azuki') ||
            message.toLowerCase().includes('0')
            ? true
            : false;
        //emit to just being
        console.log('Emitting to ' + server_2.begin);
        server_1.io.emit('azuki', {
            user: userstate['display-name'],
            isAzuki,
        });
    }
});
