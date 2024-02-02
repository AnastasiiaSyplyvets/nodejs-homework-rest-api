const HttpError = require("../../helpers/HttpError");
const { User } = require("../../models/user");
const { loginSchema } = require("../../schemas/authSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw HttpError(401, "Email or login is not valid");
    }

    const comparePasswords = await bcrypt.compare(password, user.password);
    if (!comparePasswords) {
      throw HttpError(401, "Email or password is wrong");
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "5m" });
    //   res.json(token)
    res.status(201).json({
      token: token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    res.status(error.status).json(error.message);
    // console.log(error.message);
  }
};
module.exports = { login };
