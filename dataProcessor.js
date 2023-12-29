const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

let dataStream = [];

// Event listener for new data
socket.on('data', (data) => {
  dataStream.push(data);
  processData(dataStream);
});

// Event listener for initial data
socket.on('initialData', (initialData) => {
  dataStream = initialData;
  processData(dataStream);
});

function processData(dataStream) {
  // Calculate metrics
  const sum = dataStream.reduce((a, b) => a + b, 0);
  const avg = (sum / dataStream.length) || 0;
  const max = Math.max(...dataStream);
  const min = Math.min(...dataStream);

  // Emit processed data
  socket.emit('processedData', { avg, max, min });
}

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('connect', () => {
  console.log('Connected to server');
});
