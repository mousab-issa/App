
const express = require('express');
const Router = express.Router();
//routes
const { RetriveUserDetails, EditUser ,getUser} = require('../controllers/users/UserController');
//auth middleware 
const authMiddleWare = require("../middlewares/auth");
const { body } = require('express-validator');

Router.get('/users', RetriveUserDetails)

Router.get('/users/:id', getUser)

Router.put('/users/:id', [
    body('email').isEmail()
        .withMessage('Please Enter A valid Email value').normalizeEmail(),
    body('name').isLength({
        min: 5
    }).withMessage('The name has to be at least 8 charcter'),
    body('phone').isLength({
        min: 5
    }).withMessage('The phone has to be at least 8 charcter'),
    body('companyName').isLength({
        min: 5
    }).withMessage('The password has to be at least 8 charcter'),
], EditUser)



module.exports = Router;
