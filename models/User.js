const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
})

userSchema.plugin(uniqueValidator, { message: 'Email already in use.' });

// Generate JWT => we can replace it with Passport for Oauth later on 
userSchema.methods.generateAuthToken = () => {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY);
    return token;
};

module.exports = mongoose.model('User', userSchema)
