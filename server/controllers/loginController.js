const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require("../models/User");

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({ error: "All fields are required" });
        }

        const userFound = await User.findOne({ email });

        if (!userFound) {
            return res.status(404).json({ error: "User not found" });
        }

        const result = bcrypt.compareSync(password, userFound.password);

        if (!result) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const token = jwt.sign({ user: userFound._id, name: userFound.name }, process.env.TOKEN_SECRET);

        return res.json({ token });


    } catch (err) {
        console.error("login user error - ", err);
    }
}

module.exports = { loginUser };