const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add contact name"],
  },
  email: {
    type: String,
    required: [true, "Please add email address"],
  },
  phone: {
    type: String,
    required: [true, "Please add phone number"],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = model("contact", contactSchema);
module.exports = { Contact };
