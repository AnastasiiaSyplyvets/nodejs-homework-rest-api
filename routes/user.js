const router = require("express").Router();
const { getInfo } = require("../controllers/user/getInfo");
const { authMiddleware } = require("../helpers/authMiddleware");
const { uploadAvatar } = require("../controllers/user/uploadAvatar");
const { upload } = require("../helpers/uploadAvatarMiddleware");

router.get("/current", authMiddleware, getInfo);
router.patch("/avatars", authMiddleware, upload.single("avatar"), uploadAvatar);

module.exports = router;
