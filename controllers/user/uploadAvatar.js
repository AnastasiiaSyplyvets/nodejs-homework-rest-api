const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");
const HttpError = require("../../helpers/HttpError");
// const Jimp = require("jimp");

const uploadAvatar = async (req, res, next) => {
  const { filename } = req.file;
  const { _id } = req.user;

  const fileName = `${_id}_${filename}`;

  const tempPath = path.resolve("tmp", filename);
  const publicPath = path.resolve("public/avatar", fileName);

  try {
    await fs.rename(tempPath, publicPath);

    // await Jimp.read(publicPath)
    //   .then((publicPath) => {
    //     return publicPath
    //       .resize(250, 250) // resize
    //       .quality(60) // set JPEG quality
    //       .greyscale() // set greyscale
    //       .write(`${publicPath}.jpeg`);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });

    // const newAvatar = Jimp.read(publicPath, (err, publicPath) => {
    //   if (err) throw err;
    //   publicPath
    //     .resize(250, 250) // resize
    //     .quality(60) // set JPEG quality
    //     .greyscale() // set greyscale
    //     .write("lena-small-bw.jpg"); // save
    // });

    // console.log("newAvatar", newAvatar);

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
