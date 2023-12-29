const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const socketIo = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(bodyParser.json());

// Mock data source
let dataSource = [];

// Simulate data stream
setInterval(() => {
  const data = Math.floor(Math.random() * 100);
  dataSource.push(data);
  io.emit('data', data);
}, 1000);

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.emit('initialData', dataSource);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
