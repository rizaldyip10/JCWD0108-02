const router = require("express").Router()
const { transactionControllers } = require("../controllers")
const { verifyToken } = require("../middlewares/auth")

router.get("/", verifyToken, transactionControllers.getCartItem)
router.post("/", verifyToken, transactionControllers.addToCart)
router.put("/", verifyToken, transactionControllers.checkOut)
router.delete("/", verifyToken, transactionControllers.deleteCart)

module.exports = router