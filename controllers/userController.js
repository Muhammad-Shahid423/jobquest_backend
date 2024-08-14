const User = require("../models/User");

module.exports = {
    // Get all users
    getAllUsers: async (req, res) => {
        try {
            const allUsers = await User.find();
            res.status(200).json(allUsers);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Get user
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            const { password, __v, createdAt, updatedAt, ...others } = user._doc;
            res.status(200).json(others);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    updateUser: async (req, res) => {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id, {
                    $set: req.body
                }, { new: true }
            );
            const { password, __v, createdAt, ...others } = updatedUser._doc;
            res.status(200).json(others);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted...");
        } catch (error) {
            res.status(500).json(error);
        }
    }
}