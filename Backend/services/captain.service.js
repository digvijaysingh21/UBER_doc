const captainModel = require('../models/captain.model');


//create a new captain
module.exports.createCaptain = async ({
    firstname, lastname, email, password, color, plate, capacity,vehicleType
}) => {
    //check if all fields are provided
    if(!firstname || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new error('All fields are required);')
    }
    //create the captain
    const captain = captainModel.create({
        fullname:{
            firstname,
            lastname,
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    })
    return captain;
}