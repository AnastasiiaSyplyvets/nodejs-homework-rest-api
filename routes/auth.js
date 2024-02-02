const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../helpers/authMiddleware");

const { registration } = require("../controllers/auth/registration");
const { login } = require("../controllers/auth/login");
const { logout } = require("../controllers/auth/logout");

router.post("/register", registration);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);

module.exports = router;
