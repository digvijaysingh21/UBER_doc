// Import the dotenv package and configure it
const dotenv = require('dotenv');
dotenv.config();
// Import the express package
const express = require('express');
// Import the cors package
const cors = require('cors');
// Initialize the express app
const app = express();
// Import the cookie-parser package
const cookieParser = require('cookie-parser');
// Import the user routes
const userRoutes = require('./routes/user.routes');
// Import the connectToDb function
// Connect to the database
const connectToDb = require('./db/db');
connectToDb();

// Use the cors package
app.use(cors());
// Use the express.json() and express.urlencoded() middleware
app.use(express.json());
// Use the express.urlencoded() middleware
app.use(express.urlencoded({extended:true}));
// Use the cookie-parser middleware
app.use(cookieParser());

// Define the root route
app.get('/',(req,res) =>{
    console.log('Hello world');
    res.send("Hello world hey hey");

})

// Define the user routes
app.use('/users', userRoutes);

// Export the app
module.exports = app;