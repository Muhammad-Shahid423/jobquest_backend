const Bookmark = require("../models/Bookmark");
const Job = require("../models/Job");

module.exports = {
    createBookmark: async (req, res) => {
        const jobId = req.body.jobId;
        try {
            const job = await Job.findById(jobId);
            if (!job) {
                return res.status(404).json("Job not found");
            }
            const bookmark = new Bookmark({
                userId: req.user.id,
                jobId: req.body.jobId
            });
            const savedBookmark = await bookmark.save();
            const { __v, updatedAt, ...others } = savedBookmark._doc;
            res.status(200).json(others);
            // res.status(201).json("Bookmark created successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    deleteBookmark: async (req, res) => {
        try {
            // const bookmark = await Bookmark.findById(req.params.id);
            // if (bookmark) {
            //     await bookmark.remove();
            // } else {
            //     return res.status(404).json("Bookmark not found");
            // }
            await Bookmark.findByIdAndDelete(req.params.id);
            res.status(200).json("Bookmark has been deleted...");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getBookmarks: async (req, res) => {
        try {
            const bookmarks = await Bookmark.find({ userId: req.params.userId });
            res.status(200).json(bookmarks);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}