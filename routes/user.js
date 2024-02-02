const router = require("express").Router();
const { addContact } = require("../controllers/user/addContact");
const { getInfo } = require("../controllers/user/getInfo");
const { getContacts } = require("../controllers/user/getContacts");
const { authMiddleware } = require("../helpers/authMiddleware");

router.post("/", authMiddleware, addContact);
router.get("/contacts", authMiddleware, getContacts);
router.get("/current", authMiddleware, getInfo);

module.exports = router;
