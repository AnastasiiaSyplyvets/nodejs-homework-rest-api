const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../helpers/authMiddleware");
const { verifyEmail } = require("../controllers/auth/verifyEmail");

const { registration } = require("../controllers/auth/registration");
const { login } = require("../controllers/auth/login");
const { logout } = require("../controllers/auth/logout");
const {
  resendVerificationEmail,
} = require("../controllers/auth/resendVerificationEmail");

router.post("/register", registration);
router.get("/verify/:verificationToken", verifyEmail);
router.post("/verify", resendVerificationEmail);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);

module.exports = router;
