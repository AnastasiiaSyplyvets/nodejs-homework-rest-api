const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");
const HttpError = require("../../helpers/HttpError");
const Jimp = require("jimp");

const uploadAvatar = async (req, res, next) => {
  if (!req.file) {
    throw HttpError(400, "Please upload the file");
  }
  const { filename } = req.file;
  const { _id } = req.user;

  const fileName = `${_id}_${filename}`;

  const tempPath = path.resolve("tmp", filename);
  const publicPath = path.resolve("public/avatar", fileName);

  try {
    const img = await Jimp.read(tempPath);
    await img
      .autocrop()
      .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER)
      .writeAsync(tempPath);

    await fs.rename(tempPath, publicPath);

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { avatarURL: publicPath },
      { new: true }
    );

    res.status(200).json({ avatarURL: updatedUser.avatarURL });
  } catch (error) {
    await fs.unlink(tempPath);
    throw HttpError(401, "Unauthorized");
  }
};

module.exports = { uploadAvatar };
