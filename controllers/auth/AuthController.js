// To hash the password
const bcrypt = require("bcrypt");
// Models
const User = require("../../models/User");
const { validationResult } = require('express-validator');

exports.LoginUser = async (req, res, next) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).send(errors);

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("Invalid email or password");

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword)
            return res.status(400).send("Invalid email or password");

        const token = user.generateAuthToken();
        return res.json({ token: token });

    } catch (error) {
        res.status(500);
        return res.json({ error: error.message || error });
    }
}

exports.SignUp = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).send(errors);

        const user = new User(req.body);
        const password = await bcrypt.hash(req.body.password, 12);
        user.password = password;

        await user.save();
        return res.json({ message: 'User added', user: user });

    } catch (error) {
        res.status(500);
        return res.json({ error: error.message || error });
    }
}




