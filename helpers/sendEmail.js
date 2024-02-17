const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { ApiKey } = process.env;

sgMail.setApiKey(ApiKey);

const sendEmail = async (data) => {
  const email = { ...data, from: "flizz.sia@gmail.com" };
  await sgMail.send(email);
  return true;
};

module.exports = { sendEmail };
