const express = require("express");
const router = express.Router();
const contactsControllers = require("../../controllers/contactsControllers");
const { isValidIdMiddleware } = require("../../helpers/isValidIdMiddleware");
const { authMiddleware } = require("../../helpers/authMiddleware");

router.get("/", authMiddleware, contactsControllers.getAllContacts);

router.get(
  "/:contactId",
  authMiddleware,
  isValidIdMiddleware,
  contactsControllers.getOneContact
);

router.post("/", authMiddleware, contactsControllers.createContact);

router.delete(
  "/:contactId",
  authMiddleware,
  isValidIdMiddleware,
  contactsControllers.deleteContact
);

router.put(
  "/:contactId",
  authMiddleware,
  isValidIdMiddleware,
  contactsControllers.updateContact
);
router.patch(
  "/:contactId/favorite",
  authMiddleware,
  isValidIdMiddleware,
  contactsControllers.updateFavorite
);

module.exports = router;
