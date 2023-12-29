const socket = io.connect('http://localhost:3000');

// Event listener for processed data
socket.on('processedData', (data) => {
  updateDashboard(data);
});

function updateDashboard(data) {
  // Update dashboard metrics
  document.getElementById('avg').textContent = `Average: ${data.avg}`;
  document.getElementById('max').textContent = `Max: ${data.max}`;
  document.getElementById('min').textContent = `Min: ${data.min}`;
}

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('connect', () => {
  console.log('Connected to server');
});
