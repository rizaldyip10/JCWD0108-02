const router = require("express").Router()
const { transactionControllers } = require("../controllers")
const { verifyToken } = require("../middlewares/auth")

router.get("/", verifyToken, transactionControllers.getCartItem)
router.post("/", verifyToken,transactionControllers.addToCart)
router.put("/", verifyToken, transactionControllers.checkOut)
router.get("/transaction", transactionControllers.getAllTrans)
router.patch("/:id", verifyToken, transactionControllers.updateItem)
router.delete("/:id", verifyToken, transactionControllers.deleteItem)

module.exports = router