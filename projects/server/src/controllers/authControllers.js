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
      res.status(200).send({
        status: true,
        message: "Add new cashier success",
        result,
        
      });
    } catch (error) {
      res.status(400).send(error);
      console.log(error);
    }
  },
  login: async (req, res) => {
    try {
      const username = req.body.username || "";
      const email = req.body.email || "";
      const phone = req.body.phone  || ""
      const password = req.body.password;
      const result = await cashier.findOne({ where: {[Op.or]:[{username},{email},{phone}]}});
      if (result == null) throw{message:"Account not found"}
      if (result.isBanned) throw{message:"Account is suspend"}
      if (result.isDeleted) throw{message:"Account not found"}
      const isValid = await bcrypt.compare(password, result.password)
      if (!isValid) throw { message: "Wrong password" };
      const payload = {id:result.id}
      const token = jwt.sign(payload, "minpro3", { expiresIn: "1d" })
      res.status(200).send({
        result,
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
  forgotPassword: async (req, res) => {
    try {
      console.log(process.env.KEY_JWT);
      const { email } = req.body;
      const result = await cashier.findOne({where: { email: email }});
      if (result == null) throw{message:"Account not found"}
      if (result.isBanned) throw{message:"Account is suspend"}
      if (result.isDeleted) throw{message:"Account not found"}
      const username = result.username;
      const payload = { id: result.id };
      const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn: "1h" });
      const data = await fs.readFileSync("./src/templates/templateforgotpass.html", "utf-8");
      const tempCompile = await handlebars.compile(data);
      const tempResult = tempCompile({ username, token });
      await transporter.sendMail({
        from: "rifky.rizkita@gmail.com",
        to: email,
        subject: "Reset your password",
        html: tempResult,
      });
      res.status(200).send({ message: "Check your email", token });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password } = req.body;
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

  getCashiers: async (req,res) => {
    try {
      const page = +req.query.page || 1;
      const limit = +req.query.limit || 100;
      const search = req.query.search;
      const sort= req.query.sort || "ASC"
      const condition = {isAdmin:false, isDeleted:false}
      if (search) condition['username'] = { [Op.like]: `%${search}%` };
      const offset = (page - 1) * limit
      const total = await cashier.count({where: condition})
      const result = await cashier.findAll({attributes:{exclude: ["password"]} ,where: condition, limit, offset:offset, order : [["username", sort]]})
      res.status(200).send({
        totalpage: Math.ceil(total / limit),
        currentpage: page,
        total_slave: total,
        result,
        status: true,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  banCashier: async(req,res)=>{
    try {
      const id = req.params.id
        const result = await cashier.findOne(
          {where:
            {id:id}
          }
        )
        console.log(req.params.id);
        console.log(result);
        if(result.isBanned == false){
        await cashier.update(
            {isBanned : true},
            {where:{id:id}}
            )
            res.status(200).send("Success to ban cashier")
          }
          if(result.isBanned == true) 
          {await cashier.update(
            {isBanned : false},
            {where:{id:id}}
            )
            res.status(200).send("Success to unban cashier")
          }
    } catch (error) {
        res.status(400).send("Failed")
        console.log(error);
    }
},
  deleteCashier: async(req,res)=>{
    try {
      const id = req.params.id
        const result = await cashier.findOne(
          {where:
            {id:id}
          }
        )
        await cashier.update(
            {isDeleted : true},
            {where:{id:id}}
            )
            res.status(200).send("Cashier has been deleted")
          
    } catch (error) {
        res.status(400).send("Failed")
        console.log(error);
    }
},
editCashier : async (req, res) => {
  try {
    const id = req.params.id;
    const updateFields = {};

    if (req.body.username) {
      updateFields.username = req.body.username;
    }
    if (req.body.email) {
      updateFields.email = req.body.email;
    }
    if (req.body.firstName) {
      updateFields.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
      updateFields.lastName = req.body.lastName;
    }
    if (req.body.phone) {
      updateFields.phone = req.body.phone;
    }
    if (req.body.address) {
      updateFields.address = req.body.address;
    }

    const result = await cashier.update(updateFields, {
      where: { id: id },
    });

    console.log(updateFields);
    res.status(200).send({ msg: 'Success to edit cashier' });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error, msg: 'Failed to edit cashier' });
  }
}
};
