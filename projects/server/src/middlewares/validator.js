const { body, validationResult } = require("express-validator");
const fs = require("fs");
module.exports = {
  checkAddCashier: async (req, res, next) => {
    try {
      await body("username")
        .notEmpty()
        .withMessage("Username must not be empty")
        .run(req);
      await body("email")
        .notEmpty()
        .withMessage("Email must not be empty")
        .isEmail()
        .withMessage("invalid email")
        .run(req);
      await body("password")
        .notEmpty()
        .withMessage("Password must not be empty")
        .isStrongPassword({
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
        .withMessage(
          "Password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol"
        )
        .run(req);
      await body("confirmPassword")
        .notEmpty()
        .withMessage("Confirm password must not be empty")
        .equals(req.body.password)
        .withMessage("Passwords do not match")
        .run(req);
      const validation = validationResult(req);
      if (validation.isEmpty()) {
        next();
      } else {
        return res.status(400).send({
          status: false,
          message: "Invalid validation",
          error: validation.array(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  checkLogin: async (req, res, next) => {
    try {
      await body("username").optional({ nullable: true }).run(req);
      await body("email")
        .isEmail()
        .withMessage("Invalid email")
        .optional({ nullable: true })
        .run(req);
        await body("phone")
        .isMobilePhone()
        .withMessage("Invalid phone number")
        .optional({ nullable: true })
        .run(req);
      await body("password")
        .notEmpty()
        .withMessage("Password must not be empty")
        .isStrongPassword({
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
        .withMessage(
          "Password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol"
        )
        .run(req);
      const validation = validationResult(req);
      if (validation.isEmpty()) {
        next();
      } else {
        return res.status(400).send({
          status: false,
          message: "Invalid validation",
          error: validation.array(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  checkResetPassword: async (req, res, next) => {
    try {
      await body("password")
        .notEmpty()
        .isStrongPassword({
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
        .withMessage(
          "Password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol"
        )
        .run(req);
      await body("confirmPassword")
        .notEmpty()
        .equals(req.body.password)
        .withMessage("Passwords do not match")
        .run(req);
      const validation = validationResult(req);
      if (validation.isEmpty()) {
        next();
      } else {
        return res.status(400).send({
          status: false,
          message: "Invalid validation",
          error: validation.array(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  checkForgetPassword: async (req, res, next) => {
    try {
      await body("email")
        .notEmpty()
        .withMessage("Email must not be empty")
        .isEmail()
        .withMessage("invalid email")
        .run(req);
      const validation = validationResult(req);
      if (validation.isEmpty()) {
        next();
      } else {
        return res.status(400).send({
          status: false,
          message: "Invalid validation",
          error: validation.array(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
