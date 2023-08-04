const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rifky.rizkita@gmail.com",
    pass: "gxmzebjfuzigkufm",
  },
  tls: {
    rejectUnauthorized: false,
  },
});
module.exports = transporter;
