const router = require("express").Router()
const {otpcontrollers} = require("../controllers")
const {checkEmailOtp,CheckVerifyOtp}= require("../middlewares/validators/validatorOtp")
router.post("/loginOtp",checkEmailOtp ,otpcontrollers.otpLogin)
router.post("/verifyOtp", CheckVerifyOtp,otpcontrollers.otpVerify)

module.exports = router
