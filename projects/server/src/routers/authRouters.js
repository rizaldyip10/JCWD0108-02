const router = require("express").Router()
const {authControllers} = require("../controllers")
const {verifyToken} = require("../middlewares/auth")
const { checkAddCashier, checkLogin, checkForgetPassword, checkResetPassword } = require("../middlewares/validator")
const{multerUpload} = require("../middlewares/multer")
router.post("/", verifyToken,checkAddCashier, authControllers.addCashier)
router.post("/login", checkLogin,authControllers.login)
router.get("/keepLogin",verifyToken,authControllers.keepLogin)
router.put("/resetpassword", checkForgetPassword,authControllers.forgetPassword);
router.patch("/resetpassword",verifyToken,checkResetPassword , authControllers.resetPassword);
router.patch("/profpic",verifyToken,multerUpload().single("file"), authControllers.uploadPic)

module.exports= router