// Desc: Service for user
// Create a new file named user.service.js in the services folder and add the following code to it:

const userModel = require('../models/user.model')


//create a new user
module.exports.createUser = async ({
    firstname, lastname, email, password
}) => {
    //check if all fields are provided
    if (!firstname || !email || !password){
        throw new Error('All fields are required');
    }
    //create the user
    const user = userModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })
    return user;
}  