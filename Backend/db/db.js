const mongoose = require('mongoose');

function connectDb(){
    mongoose.connect(process.env.DB_CONNECT,
        ).then(() => {
           console.log("Connected to db");
    }).catch(err => console.log(err));
}

module.exports = connectDb;