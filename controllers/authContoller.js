const User = require("../models/User");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
    createUser: async (req, res) => {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
        });

        try {
            const savedUser = await newUser.save();
            res.status(200).json(savedUser);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // loginUser
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            !user && res.status(401).json("Wrong Password or Username!");

            const decryptPassword = CryptoJs.AES.decrypt(user.password, process.env.PASS_SEC);
            const originalPassword = decryptPassword.toString(CryptoJs.enc.Utf8);
            originalPassword !== req.body.password && res.status(401).json("Wrong Password");

            const { password, __v, createdAt, ...others } = user._doc;
            const token = jwt.sign(others, process.env.JWT_SEC, { expiresIn: "1d" });
            res.status(200).json({ ...others, token });
        
        } catch (error) {
            res.status(500).json(error);
        }
    },

    updateUser: async (req, res) => {

    },
}