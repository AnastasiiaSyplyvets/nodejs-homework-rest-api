const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },

  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  contacts: [Types.ObjectId],
  avatarURL: {
    type: String,
    default: "",
  },
});

const User = model("user", userSchema);
module.exports = { User };
