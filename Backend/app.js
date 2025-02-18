const dotenv = require('dotenv');
dotenv.config();
const express = require('express');

const cors = require('cors');
const app = express();

app.use(cors());

app.get('/',(req,res) =>{
    console.log('Hello world');
    res.send("Hello world hey hey");

})

module.exports = app;