const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

// Event listener for connection error
socket.on('connect_error', (error) => {
  console.error('Connection Error:', error);
});

// Event listener for connection timeout
socket.on('connect_timeout', () => {
  console.error('Connection Timeout');
});

// Event listener for error
socket.on('error', (error) => {
  console.error('Error:', error);
});

// Event listener for disconnect
socket.on('disconnect', (reason) => {
  if (reason === 'io server disconnect') {
    console.error('Server disconnected');
  } else {
    console.error('Client disconnected due to:', reason);
  }
});

// Event listener for data error
socket.on('data_error', (error) => {
  console.error('Data Error:', error);
});

// Event listener for processed data error
socket.on('processedData_error', (error) => {
  console.error('Processed Data Error:', error);
});
