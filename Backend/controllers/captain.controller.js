const captainModel = require('../models/captain.model');
const captainService =  require('../services/captain.service');
const {validationResult} = require('express-validator');

module.exports.registerCaptain = async (req, res, next) => {
    //error handling
    const errors = validationResult(req);
    //if there are no errors
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    console.log(req.body);

    const {fullname, email, password, vehicle} = req.body;

    const isCaptainAlredyExist = await captainModel.findOne({email});
    if(isCaptainAlredyExist){
        return res.status(400).json({errors: [{msg: 'Captain already exists'}]});
    }

    //hash the password
    const hashedPassword = await captainModel.hashPassword(password);

    //create the captain
    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password:hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    //generate the token
    const token = captain.generateAuthToken();
    //return the token and captain
    res.status(201).json({token, captain});
}


