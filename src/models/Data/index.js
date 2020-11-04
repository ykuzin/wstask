const mongoose = require("mongoose")

const Data = new mongoose.Schema({
    symbol: { type: String, unique: true, index: true },
    minAsk: { type: mongoose.Types.Decimal128 },
    minBid: { type: mongoose.Types.Decimal128 },
    maxAsk: { type: mongoose.Types.Decimal128 },
    maxBid: { type: mongoose.Types.Decimal128 },
    timestamp: { type: String },
})

module.exports = mongoose.model("Data", Data)
