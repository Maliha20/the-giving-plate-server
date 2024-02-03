const express = require("express");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const User = require('../models/user.model')
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
router.post(
  "/register",
  upload.single("image"),
  async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      let user = new User();
      ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        image: result.secure_url,
        cloudinary_id: result.public_id,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        occupation: req.body.occupation,
        
      });

      await user.save();
      res.json(user);
    } catch (err) {
      
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  },
  registerUser
);
router.get("/", isAuthenticated, isAdmin, getAllUsers);
router.get("/:uid", isAuthenticated, getAnUser);
router.patch("/:uid", isAuthenticated, isAdmin, updateUserRole);

module.exports = router;
