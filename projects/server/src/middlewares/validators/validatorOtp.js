const { body, validationResult } = require("express-validator");
module.exports = {
  checkEmailOtp: async (req, res, next) => {
    try {
      await body("email")
        .notEmpty()
        .withMessage("Email must no be empty")
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
  CheckVerifyOtp: async (req, res, next) => {
    try {
      await body("email")
        .notEmpty()
        .withMessage("Email must no be empty")
        .isEmail()
        .withMessage("Invalid Email")
        .run(req);
      await body("otp")
        .notEmpty()
        .withMessage("OTP must not be empty")
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
