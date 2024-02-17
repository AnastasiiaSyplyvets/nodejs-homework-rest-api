const { User } = require("../../models/user");
const { HttpError } = require("../../helpers/HttpError");
const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  console.log("verificationToken", verificationToken);
  const user = await User.findOne({ verificationToken });
  console.log("user", user);

  if (!user) {
    throw HttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });
  res.json({ message: "Email verified successully" });
};

module.exports = { verifyEmail };
