const captainModel = require('../models/captain.model');
const captainService =  require('../services/captain.service');
const {validationResult} = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');




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




module.exports.loginCaptain = async (req, res, next) => {
    //error handling
    const errors = validationResult(req);
    //if there are errors
    if(!errors.isEmpty()){
        //return the errors
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    //find the captain
    const captain = await captainModel.findOne({email}).select('+password');
    //if the captain is not found
    if(!captain){
        // return res.status(400).json({errors: [{msg: 'Invalid email or password'}]});
        return res.status(401).json({ message: 'Invalid email or password'});
    }
    
    //if found then compare the password
    const isMatch = await captain.comparePassword(password);
    //if the password does not match
    if(!isMatch){
        //return the error message
        return res.status(401).json({message: 'Invalid email or password'});
    }

    //generate the token                
    const token = captain.generateAuthToken();
    //return the token and captain  
    res.cookie('token', token);
    return res.status(200).json({token, captain});
}


module.exports.getCaptainProfile = async (req, res, next) =>{
    res.status(200).json({captain: req.captain});
    // const captain = req.captain;
    // res.status(200).json({captain});
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistTokenModel.create({token});

    res.clearCookie('token');

    res.status(200).json({message: 'Logged out successfully'});
}