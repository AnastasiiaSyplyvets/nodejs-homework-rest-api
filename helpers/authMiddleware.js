const HttpError = require("./HttpError");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { User } = require("../models/user");

const authMiddleware = async (req, res, next) => {
  console.log("authMiddleware");
  console.log("req.headers", req.headers);
  const authHeader = req.headers.authorization || "";

  console.log(authHeader);
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer") {
    next(HttpError(401, "Token is not valid"));
  }
  if (!token) {
    next(HttpError(401, "No token provided"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    req.user = user;
    // res.status(200).json(user);
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      next(HttpError(401, "Token is not valid"));
    }
    next(error);
  }
  next();
};
module.exports = { authMiddleware };
