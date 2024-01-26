const express = require("express");
const router = express.Router();
const contactsControllers = require("../../controllers/contactsControllers");

router.get("/", contactsControllers.getAllContacts);

router.get("/:contactId", contactsControllers.getOneContact);

router.post("/", contactsControllers.createContact);

router.delete("/:contactId", contactsControllers.deleteContact);

router.put("/:contactId", contactsControllers.updateContact);
router.patch("/:contactId/favorite", contactsControllers.updateFavorite);

module.exports = router;
