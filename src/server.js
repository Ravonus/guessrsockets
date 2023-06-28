"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.begin = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
exports.begin = '';
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'https://pfpguessr.com'],
        methods: ['GET', 'POST'],
    },
});
exports.io = io;
io.on('connection', (socket) => {
    exports.begin = socket.id;
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
const port = process.env.PORT || 1337;
server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
