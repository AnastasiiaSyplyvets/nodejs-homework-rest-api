const express = require("express");
const router = express.Router();

const { registration } = require("../controllers/auth/registration");
const { login } = require("../controllers/auth/login");

router.post("/register", registration);
router.post("/login", login);

module.exports = router;
