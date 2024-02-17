const { emailSchema } = require("../../schemas/authSchema");
const { HttpError } = require("../../helpers/HttpError");
const { User } = require("../../models/user");
const { sendEmail } = require("../../helpers/sendEmail");
require("dotenv").config();

const { BASE_URL } = process.env;

const resendVerificationEmail = async (req, res) => {
  const { error } = emailSchema.validate(req.body);

  if (error) {
    throw HttpError(400, "missing required field email");
  }
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "email not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Verify your email</a>`,
  };

  await sendEmail(verifyEmail);
  res.json({ message: "Verification email sent successfully" });
};

module.exports = { resendVerificationEmail };
