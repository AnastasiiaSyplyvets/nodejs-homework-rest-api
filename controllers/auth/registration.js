const HttpError = require("../../helpers/HttpError");
const { User } = require("../../models/user");
const { registerSchema } = require("../../schemas/authSchema");
const bcrypt = require("bcryptjs");

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
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    res.status(201).json({
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    res.status(error.status).json(error.message);
    // console.log(error.message);
    // next(error);
  }
};
module.exports = { registration };
