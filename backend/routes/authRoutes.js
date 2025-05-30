const express = require("express");
const router = express.Router();

// ✅ Import the controller functions
const { registerUser, loginUser } = require("../controllers/authController");

// ✅ Define your routes
router.get("/test", (req, res) => {
  res.send("Auth routes are working!");
});

router.post("/signup", registerUser); // POST /api/auth/signup
router.post("/login", loginUser); // POST /api/auth/login

module.exports = router;
