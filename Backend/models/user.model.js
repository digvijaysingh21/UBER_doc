// Import the required modules
const mongoose = require('mongoose');
// Import the bcrypt module
const bcrypt = require('bcrypt');
// Import the jsonwebtoken module
const jwt = require('jsonwebtoken');

//create the user schema
const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
        // minlength: 3,
           minlength: [3, 'First name must be at least 3 characters long']
            },
            lastname: {
                type: String,
                minlength: [3, 'Last name must be at least 3 characters long']
            }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        minlength: [6, 'Email must be at least 6 characters long']

    },

/**
 * @param select: false
* This is an important security feature. When select is set to false, the password field will be excluded from query results by default.
* This is done to prevent passwords from being accidentally exposed when you query the database (e.g., when fetching user data). 
* Even if you fetch a user document, the password field will not be included unless you explicitly ask for it.
*/
    password:{
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    }
})

//generate the auth token
userSchema.methods.generateAuthToken = function(){
    //generate a token
  const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);  
  return token;
}

//compare the password
userSchema.methods.comparePassword =async function(password){
    //compare the password
    return await bcrypt.compare(password, this.password);
}

//hash the password
userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

//create the user model
const userModel = mongoose.model('user', userSchema);

//export the user model
module.exports = userModel;