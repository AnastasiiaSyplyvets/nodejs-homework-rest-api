const addSchema = require("../schemas/contactSchemas");
const updateContactSchema = require("../schemas/contactSchemas");
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
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json(result);
  } catch (error) {
    // res.status(404).json({ message: "Not found" });
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

const createContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw new HttpError(400, error.message);
    }

    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      res.json({ message: "Body must have at least one field" });
    }
    const { contactId } = req.params;

    const result = await contacts.updateContact(contactId, req.body);

    if (!result) {
      //   throw HttpError(400, error.message);
      console.log(error.message);
    }
    res.sendStatus(200).json(result);
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
