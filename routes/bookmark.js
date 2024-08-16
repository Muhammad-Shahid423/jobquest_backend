const router = require("express").Router();
const bookmarkController = require("../controllers/bookmarkController");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("../middleware/verifyToken");


// CREATE BOOKMARKS
router.post("/", verifyTokenAndAuthorization, bookmarkController.createBookmark);


// DELETE BOOKMARKS

router.delete("/:id", verifyToken, bookmarkController.deleteBookmark);


// GET BOOKMARKS
router.get("/:userId", bookmarkController.getBookmarks);



module.exports = router