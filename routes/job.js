const router = require("express").Router();
const jobController = require("../controllers/jobController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

// Post Job
router.post("/postJob", verifyTokenAndAdmin, jobController.createJob);

// Update Job
router.put("/:id", verifyTokenAndAdmin, jobController.updateJob);

// Delete Job
router.delete("/:id", verifyTokenAndAdmin, jobController.deleteJob);

// Get Job
router.get("/:id", jobController.getJob);

// Get All Jobs
// Use verifyTokenAndAdmin for the 'get all users' route
router.get("/", jobController.getAllJobs);

// Search Jobs
router.get("/search/:key", jobController.searchJobs);

module.exports = router;