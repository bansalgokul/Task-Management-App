const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require("../models/User");

const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(401).json({ error: "All fields are required" });
        }

        const userFound = await User.findOne({ email });

        if (userFound) {
            return res.status(409).json({ error: "User already exist. Go to Login." })
        }

        const hashedPassword = bcrypt.hashSync(password, process.env.SALT);

        await User.create({
            name, email, password: hashedPassword, isAdmin: false
        })

        return res.status(201).json({ message: "User registered successfully" });

    } catch (err) {
        console.error("register user error - ", err);
    }
}

module.exports = { registerUser };