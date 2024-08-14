const router = require("express").Router();
const userController = require("../controllers/userController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

// Update User
router.put("/:id", verifyTokenAndAuthorization, userController.updateUser);

// Delete User
router.delete("/:id", verifyTokenAndAuthorization, userController.deleteUser);

// Get User
router.get("/:id", verifyTokenAndAuthorization, userController.getUser);

// Get All Users
// Use verifyTokenAndAdmin for the 'get all users' route
router.get("/", verifyTokenAndAdmin, userController.getAllUsers);

module.exports = router;