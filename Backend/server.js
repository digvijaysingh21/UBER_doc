// Initialize the server
// Description: This file is used to initialize the server and listen on the port 3000. It uses the app.js file to create the server.

const http = require('http');
// Import the app.js file
const app = require('./app');

// Set the port to the environment variable PORT or 3000
const port = process.env.PORT || 3000;

// Create a server using the app.js file
const server = http.createServer(app);

// Listen on the port
server.listen(port, () => {
    console.log(`Server running on port ${port}`)
});