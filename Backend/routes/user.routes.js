// Initialize express router
const express = require('express');
//create the router
const router = express.Router();

//import the express-validator
const {body} = require('express-validator');

//import the user controller
const userController = require('../controllers/user.controller');

//register route
router.post('/register', [
    //validate the request body
    body('email').isEmail().withMessage('Invalid Email'),
    //validate the first name
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be 3 character long'),
    //password must be 6 character long
    //validate the password
    body('password').isLength({min: 6}).withMessage('Password must be 6 character long')
],
//call the register controller
   userController.registerUser
)


//login route
router.post('/login',[
    //validate the email
    body('email').isEmail().withMessage('Invalid Email'),
    //validate the password
    body('password').isLength({min: 6}).withMessage('Password must be 6 character long')
],
//call the login controller
userController.loginUser
)

//export the router
module.exports = router;