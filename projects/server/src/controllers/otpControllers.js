function generateRandomFourDigits() {
  const min = 1000;
  const max = 9999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber.toString();
}

const db = require("../models");
const cashier = db.Cashier;
const otp_ = db.Otp;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const transporter = require("../middlewares/transporter");
const fs = require("fs");
const handlebars = require("handlebars");

module.exports = {
  otpLogin: async (req, res) => {
    try {
      const { email } = req.body;
      const isAccountExist = await cashier.findOne({ where: { email } });
      if (isAccountExist == null) throw { message: "Account not found" };
      const isOtpExist = await otp_.findOne({where: {CashierId:isAccountExist.id}})
      if (isOtpExist) throw {message:"OTP is already sent to your email"}
      const otpNumber = generateRandomFourDigits();
      const salt = await bcrypt.genSalt(10);
      const hashOTP = await bcrypt.hash(otpNumber, salt);
      const result = await otp_.create({
        otp: hashOTP,
        CashierId: isAccountExist.id,
      });
      const data = await fs.readFileSync("./src/templates/templateotp.html", "utf-8");
      const tempCompile = await handlebars.compile(data);
      const tempResult = tempCompile({
        username: isAccountExist.username,
        otp: otpNumber,
      });
      await transporter.sendMail({
        from: process.env.EMAIL_TRANSPORTER,
        to: email,
        subject: "OTP",
        html: tempResult,
      });
      res.status(200).send({
        status: true,
        message: "Check your email",
        email,
      });
    } catch (error) {
      res.status(400).send(error);
      console.log(error);
    }
  },
  otpVerify: async (req, res) => {
    try {
      const { otp, email } = req.body;
      const result = await cashier.findOne({
        where: { email },
      });
      const isOtpExist = await otp_.findOne({
        where: { CashierId: result.id },
      });
      const isValid = await bcrypt.compare(otp, isOtpExist.otp);
      if (!isValid) throw { message: "Wrong OTP" };
      await otp_.destroy({ where: { id: isOtpExist.id } });
      const payload = { id: result.id };
      const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn: "1d" });
      res.status(200).send({
        status: true,
        message: "Login success",
        token,
      });
    } catch (error) {
      res.status(400).send(error);
      console.log(error);
    }
  },
};
