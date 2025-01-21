import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';
import authenticateMiddleware from './middlewares/authMiddleware.js'

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins
    methods: ['GET', 'POST'], // Allow GET and POST methods
  },
  connectionStateRecovery: {},
});
io.use(authenticateMiddleware);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(8000, () => {
  console.log('server running at http://localhost:8000');
});