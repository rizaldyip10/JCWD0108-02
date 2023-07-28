const db = require("../models");
const cashier = db.Cashier;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const transporter = require("../middlewares/transporter");
const fs = require("fs");
const handlebars = require("handlebars");

module.exports = {
  addCashier: async (req, res) => {
    try {
      const { username, password, email } = req.body;
      const isAccountExist = await cashier.findOne({where:{id:req.user.id}})
      if(!isAccountExist.isAdmin) throw {message:"Only admin can add new cashier"}
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const result = await cashier.create({
        username,
        email,
        password: hashPassword,
      });
      const payload = { id: result.id };
      const token = jwt.sign(payload, "minpro4", { expiresIn: "1h" });
      /*const data = await fs.readFileSync("./template.html", "utf-8");
      const tempCompile = await handlebars.compile(data);
      const tempResult = tempCompile({ username, token });
      await transporter.sendMail({
        from: "rifky.rizkita@gmail.com",
        to: email,
        subject: "Verify account",
        html: tempResult,
      });*/
      res.status(200).send({
        status: true,
        message: "Add new cashier success",
        result,
        token,
      });
    } catch (error) {
      res.status(400).send(error);
      console.log(error);
    }
  },
  login: async (req, res) => {
    try {
      const{username, password} = req.body
      const result = await cashier.findOne({ where: {username}});
      console.log(result);
      if (result == null) throw{message:"Cashier not found"}
      const isValid = await bcrypt.compare(password, result.password)
      if (!isValid) throw { message: "Wrong password" };
      const payload = {id:result.id}
      const token = jwt.sign(payload, "minpro3", { expiresIn: "1d" })
      res.status(200).send({
        status: true,
        message: "Login success",
        token,
      });
    } catch (error) {
      res.status(400).send(error)
      console.log(error);
    }
  },
  keepLogin: async (req, res) => {
    try {
      const result = await cashier.findOne({
        where: {
          id: req.user.id,
        },
      });
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
      console.log(error);
    }
  },
  forgetPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const result = await cashier.findOne({where: { email: email }});
      if (result == null) throw { msg: "Account not found" };
      const username = result.username;
      const payload = { id: result.id };
      const token = jwt.sign(payload, "minpro3", { expiresIn: "1h" });
      // const data = await fs.readFileSync("./templateforgotpass.html", "utf-8");
      // const tempCompile = await handlebars.compile(data);
      // const tempResult = tempCompile({ username, token });
      // await transporter.sendMail({
      //   from: "rifky.rizkita@gmail.com",
      //   to: email,
      //   subject: "Reset your password",
      //   html: tempResult,
      // });
      res.status(200).send({ message: "Check your email", token });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password, confirmPassword } = req.body;
      console.log(req.user.id);
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const result = await cashier.update(
        { password: hashPassword },
        { where: { id: req.user.id } }
      );
      if (result[0] == 0) throw { message: "Password failed to changed" };
      res.status(200).send({ result, message: "Password has been changed" });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  uploadPic: async (req, res) => {
    try {
      if (req.file == undefined) {
        throw { message: "Image should not be empty" };
      }
      const result = await cashier.update(
        {
          imgProfile: req.file.filename,
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );
      res.status(200).send({ result, message: "Upload success" });
    } catch (error) {
      res.status(400).send(error);
      console.log(error);
    }
  },
};
