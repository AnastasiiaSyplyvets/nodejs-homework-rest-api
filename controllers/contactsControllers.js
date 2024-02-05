const { addSchema } = require("../schemas/contactSchemas");
const {
  updateContactSchema,
  updateFavoriteSchema,
} = require("../schemas/contactSchemas");
const HttpError = require("../helpers/HttpError");
const { Contact } = require("../models/contact");

const getAllContacts = async (req, res) => {
  try {
    const { _id: owner } = req.user;

    const result = await Contact.find({ owner });

    res.status(200).json(result);
  } catch (error) {
    throw HttpError(error.status, error.message);
  }
};

const getOneContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await Contact.findById(contactId);

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
    const { id: owner } = req.user;
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete({
      _id: contactId,
      owner,
    });
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

    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
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
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!result) {
      throw HttpError(400, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    if (!req.body) {
      throw HttpError(400, { message: "Body must have at least one field" });
    }
    const { error } = updateFavoriteSchema.validate(req.body);
    if (error) {
      return res.json({ message: error.message });
    }
    const { contactId } = req.params;

    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

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
  updateFavorite,
};
