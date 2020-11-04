const Data = require("../models/Data")
async function getAllSymbols(req, res) {
    const queryResult = await Data.find({})
    res.send(queryResult)
}
module.exports = { getAllSymbols }
