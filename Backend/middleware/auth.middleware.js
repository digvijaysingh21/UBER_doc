const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const captainModel = require('../models/captain.model');
const blacklistTokenModel = require('../models/blacklistToken.model');


module.exports.authUser = async(req, res, next) =>{
    //token can be present in the cookie or in the header
    //get the token from the cookie
    // const token = req.cookies.token;
    //get the token from the header
    // const token = req.headers.authorization.split('')[1];
    // const token = req.cookies.token || req.headers.authorization.split('')[1];
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];


    //if there is no token
    if(!token){
        //return unauthorized
        return res.status(401).json({message: 'Unauthorized'});
    }

    //check if the token is blacklisted
    const isBlacklisted = await blacklistTokenModel.findOne({token});
    //if the token is blacklisted
    if(isBlacklisted){
        //return unauthorized
        return res.status(401).json({message: 'Unauthorizes'});

    }

    //verify the token
    try{
        //decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //find the user by id
        const user = await userModel.findById(decoded._id);
        //set the user in the request object
        req.user = user;
        //move to the next middleware
        return next();
    }catch(error){
        return res.status(401).json({message: 'Unauthorized;'})
    }
    
}

module.exports.authCaptain = async(req, res, next) =>{
    //token can be present in the cookie or in the header

    // const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    console.log(token);
    //if there is no token
    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }

    
    //check if token is blacklisted
    const isBlacklisted = await blacklistTokenModel.findOne({token});
    console.log(isBlacklisted);
    //if the token is blacklisted
    if(isBlacklisted){
        return res.status(401).json({message: 'Unauthorized'});
    }

    //verify the token
    try{
        //decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //find the captain by id
        console.log("Decoded Token:", decoded);
        const captain = await captainModel.findById(decoded._id);
        //set the captain in the request object
        req.captain = captain;
        //move to the next middleware
        return next();
    }catch(error){
        console.log(error);
        return res.status(401).json({message: 'Unauthorized'});
    }
}