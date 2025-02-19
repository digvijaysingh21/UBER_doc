const mongoose = require('mongoose');

const bcrypt = ('require bcrypt');
const jwt = require('jsonwebtoken');

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

userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id: this._id}, process.env.jwt_SECRET);  
  return token;
}

userSchema.methods.comparePassword =async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.static.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;