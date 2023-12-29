const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

let dataStream = [];
let filteredDataStream = [];

// Event listener for new data
socket.on('data', (data) => {
  dataStream.push(data);
  filterData(dataStream);
});

// Event listener for initial data
socket.on('initialData', (initialData) => {
  dataStream = initialData;
  filterData(dataStream);
});

function filterData(dataStream) {
  // Define filter criteria
  const filterCriteria = (data) => data > 50; // Example: filter out data less than or equal to 50

  // Filter data based on criteria
  filteredDataStream = dataStream.filter(filterCriteria);

  // Emit filtered data
  socket.emit('filteredData', filteredDataStream);
}

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('connect', () => {
  console.log('Connected to server');
});
