const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const {validationResult} = require('express-validator');
const BlacklistTokenModel = require('../models/blacklistToken.model');


//register controller
module.exports.registerUser = async (req, res, next) => {
   //error handling
   const errors = validationResult(req);
   //if there are errors
   if(!errors.isEmpty()){
      //return the errors
     return res.status(400).json({errors: errors.array()});
   }

   console.log(req.body);

//    const {firstname, lastname, email,password} = req.body;

//het the fullname, email and password from the request body
const {fullname,email,password} = req.body;

const isUserAlreadyExist = await userModel.findOne({email});
//if the user already exists
if(isUserAlreadyExist){
   //return the error message
   return res.status(400).json({errors: [{msg: 'User already exists'}]});
}

//hash the password
   const hashedPassword = await userModel.hashPassword(password);
//create the user
   const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword
   });

   //generate the token
   const token = user.generateAuthToken();
   //return the token and user
   res.status(201).json({token, user});

}


//login controller
module.exports.loginUser = async(req,res,next) => {
   //error handling
  const errors = validationResult(req);
  //if there are errors
  if(!errors.isEmpty()){
   //return the errors
   return res.status(400).json({errors: errors.array()});
  }

  //get the email and password from the request body
  const{email, password} = req.body;

  //find the user by email if found then select the password field

  //here findOne is used for finding the user by email

  // select('+password'); means that the password field will be included in the query results
  // even though it is set to select: false in the schema definition.
  const user = await userModel.findOne({email}).select('+password');

  //if the user is not found
  if(!user){
   //return the error message
   return res.status(401).json({ message: 'Invalid email or password'});
  }

  //compare the password
  const isMatch = await user.comparePassword(password);
  //if the password does not match
  if(!isMatch){
   //return the error message
   return res.status(401).json({ message: 'Invalid email or password'});
  }

  //generate the token
  const token = user.generateAuthToken();

  //we can also store the token in the cookie
  res.cookie('token', token);
  //return the token and user
  return res.status(200).json({token, user});
}

//get user profile controller
module.exports.getUserProfile = async(req, res, next) => {
   res.status(200).json(req.user);
}

//logout controller
module.exports.logoutUser = async(req, res, next) => {
   //get the token from the cookie or header
   const token = req.cookies.token || req.headers.generateAuthToken.split(' ')[1];
   //add the token to the blacklist
   await BlacklistTokenModel.create({token});
   //clear the cookie
   res.clearCookie('token');
   
   
   res.status(200).json({message: 'Logged out successfully'});
}