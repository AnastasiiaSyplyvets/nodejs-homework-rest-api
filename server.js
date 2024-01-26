const app = require("./app");

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });

// zAxWYJ38hFDKAy4t;

//admin

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const { DB_HOST } = process.env;

console.log(DB_HOST);
//   const DB_HOST =
//   "mongodb+srv://flizz:Kx59n8EmHVKAsj-@cluster0.lmg7zjz.mongodb.net/";
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
