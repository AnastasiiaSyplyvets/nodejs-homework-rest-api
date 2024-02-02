const HttpError = require("./HttpError");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { User } = require("../models/user");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";

  console.log("token in middleware", authHeader);
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
    if (!user) {
      next(HttpError(401), "Not authorized");
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      next(HttpError(401, "Token is not valid"));
    }
    return next(error);
  }
};
module.exports = { authMiddleware };
