const router = require("express").Router()

const { getAllSymbols } = require("../middleware/getAllSymbols")
const { getSpecialSymbol } = require("../middleware/getSpecialSymbol")

router.get("/symbol", getAllSymbols)
router.get("/symbol/:symbol", getSpecialSymbol)

module.exports = router
