const HttpError = require("../../helpers/HttpError");
const { User } = require("../../models/user");
const { registerSchema } = require("../../schemas/authSchema");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const registration = async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, "Email in use");
    }
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const avatarUser = gravatar.url(email, { s: "200", r: "pg", d: "404" });
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
      avatarURL: avatarUser,
    });

    res.status(200).json({
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};
module.exports = { registration };
