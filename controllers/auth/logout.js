const HttpError = require("../../helpers/HttpError");
const { User } = require("../../models/user");

const logout = async (req, res, next) => {
  try {
    const { user } = req;
    console.log(user);
    if (!user) {
      throw HttpError(401, "Not authorized");
    }
    const foundUser = await User.findById(user._id);
    console.log(foundUser);
    foundUser.token = null;
    await foundUser.save();

    res.status(204).json({ message: "User logged out" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { logout };
