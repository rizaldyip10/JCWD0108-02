const reportControllers = require("../controllers/reportControllers");
const router = require("express").Router()


router.get("/", reportControllers.getTrans)

module.exports = router