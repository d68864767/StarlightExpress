const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

let historicalData = [];

// Event listener for new data
socket.on('data', (data) => {
  historicalData.push(data);
  storeData(historicalData);
});

// Event listener for initial data
socket.on('initialData', (initialData) => {
  historicalData = initialData;
  storeData(historicalData);
});

function storeData(historicalData) {
  // Store data for historical analysis
  // This is a mock storage, in a real application this should be replaced with a database or file storage
  console.log('Storing data:', historicalData);
}

// Function to retrieve historical data
function getHistoricalData() {
  // In a real application, this should fetch data from the database or file storage
  return historicalData;
}

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('connect', () => {
  console.log('Connected to server');
});

module.exports = {
  getHistoricalData,
};
