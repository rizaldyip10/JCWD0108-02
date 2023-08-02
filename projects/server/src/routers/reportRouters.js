const reportControllers = require("../controllers/reportControllers");
const router = require("express").Router()


router.get("/", reportControllers.getTrans)
router.get("/income", reportControllers.profit)
router.get("/order", reportControllers.todayOrder)
router.get("/product", reportControllers.topProduct)
router.get("/totalCashier", reportControllers.totalCashier)

module.exports = router