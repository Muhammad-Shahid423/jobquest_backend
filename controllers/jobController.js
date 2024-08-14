const Job = require("../models/Job");

module.exports = {

    createJob: async (req, res) => {
        const newJob = new Job(req.body);
        try {
            const savedJob = await newJob.save();
            const { __v, createdAt, updatedAt, ...others } = savedJob._doc;
            res.status(200).json(others);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    updateJob: async (req, res) => {
        try {
            const updatedJob = await Job.findByIdAndUpdate(
                req.params.id, {
                    $set: req.body
                }, { new: true }
            );
            const { __v, createdAt, updatedAt, ...others } = updatedJob._doc;
            res.status(200).json(others);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    deleteJob: async (req, res) => {
        try {
            await Job.findByIdAndDelete(req.params.id);
            res.status(200).json("Job has been deleted...");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getJob: async (req, res) => {
        try {
            const job = await Job.findById(req.params.id);
            const { __v, createdAt, updatedAt, ...others } = job._doc;
            res.status(200).json(others);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getAllJobs: async (req, res) => {
        try {
            const allJobs = await Job.find();
            res.status(200).json(allJobs);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    searchJobs: async (req, res) => {
        try {
            const regex = new RegExp(req.params.key, 'i'); // 'i' for case-insensitive
            const allJobs = await Job.aggregate([
                {
                    $match: {
                        $or: [
                            { title: { $regex: regex } }, 
                            { description: { $regex: regex } }
                        ]
                    }
                }
            ]);
            res.status(200).json(allJobs);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}