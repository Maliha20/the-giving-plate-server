const express = require("express");
const upload = require("../middlewares/multer.middleware");

const {
  loginUser,
  registerUser,
  getAllUsers,
  getAnUser,
  updateUserRole,
} = require("../controllers/user.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/admin.middleware");
const router = express.Router();

router.post("/login", loginUser);
router.post("/register", upload.single('image'), registerUser);
router.get("/", isAuthenticated, isAdmin, getAllUsers);
router.get("/:uid", isAuthenticated, getAnUser);
router.patch("/:uid", isAuthenticated, isAdmin, updateUserRole);

module.exports = router;
