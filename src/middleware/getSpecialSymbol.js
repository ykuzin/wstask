const Data = require("../models/Data")
async function getSpecialSymbol(req, res) {
    const queryResult = await Data.find({ symbol: req.params.symbol })
    res.send(queryResult)
}
module.exports = { getSpecialSymbol }
