const express = require('express');
const Router = express.Router();
//routes
const { SignUp, LoginUser } = require('../controllers/auth/AuthController');
// Validation 
const { body, } = require('express-validator');
//auth middleware 


// create user  
Router.post('/sign-up', [
    body('email').isEmail()
        .withMessage('Please Enter A valid Email value').normalizeEmail(),
    body('password').isLength({
        min: 5
    }).withMessage('The password has to be at least 8 charcter'),
    body('name').isLength({
        min: 5
    }).withMessage('The name has to be at least 8 charcter'),
    body('phone').isLength({
        min: 5
    }).withMessage('The phone has to be at least 8 charcter'),
    body('companyName').isLength({
        min: 5
    }).withMessage('The password has to be at least 8 charcter'),

], SignUp);


// login
Router.get('/sign-in', [
    body('email').isEmail()
        .withMessage('Please Enter A valid Email value').normalizeEmail(),
    body('password').isLength({
        min: 5
    }).withMessage('The password has to be at least 8 charcter'),

], LoginUser)

module.exports = Router;
