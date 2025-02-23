const mongoose = require('mongoose');


//connect to the database
function connectToDb(){
    mongoose.connect(process.env.DB_CONNECT,
        ).then(() => {
           console.log("Connected to db");
    }).catch(err => console.log(err));
}


//export the function
module.exports = connectToDb;