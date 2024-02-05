const router = require("express").Router();
const { getInfo } = require("../controllers/user/getInfo");
const { authMiddleware } = require("../helpers/authMiddleware");

router.get("/current", authMiddleware, getInfo);

module.exports = router;
