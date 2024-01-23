const { addSchema } = require("../schemas/contactSchemas");
const { updateContactSchema } = require("../schemas/contactSchemas");
const contacts = require("../models/contacts");
const HttpError = require("../helpers/HttpError");

const getAllContacts = async (req, res) => {
  try {
    const result = await contacts.listContacts();
    res.status(200).json(result);
  } catch (error) {
    throw HttpError(error.status, error.message);
  }
};

const getOneContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const createContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    if (!req.body) {
      throw HttpError(400, { message: "Body must have at least one field" });
    }

    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      return res.json({ message: error.message });
    }
    const { contactId } = req.params;

    const result = await contacts.updateContact(contactId, req.body);
    console.log("Updated contact:", result);
    if (!result) {
      throw HttpError(400, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};
