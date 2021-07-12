
const User = require("../../models/User");
const { validationResult } = require('express-validator');

exports.RetriveUserDetails = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).send(errors);

        const users = await User.find({}).select('-password');

        return res.json({ users })

    } catch (error) {
        return res.status(500).send(error);
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).send(errors);

        const { id } = req.params;

        const user = await User.findById(id);

        return res.json({ user })

    } catch (error) {
        return res.status(500).send(error);
    }
}

exports.EditUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).send(errors);

        const { id } = req.params;
        console.log(id, req.body);

        const user = await User.findByIdAndUpdate(id, req.body, {
            upsert: true
        });
        return res.json({ user })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
