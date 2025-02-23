const userModel = require('../models/user.model');
const userService = require('../services/user.service');

const {validationResult} = require('express-validator');


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
  //return the token and user
  return res.status(200).json({token, user});
}