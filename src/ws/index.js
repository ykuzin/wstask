const Data = require("../models/Data")
let interval = null

const WebSocket = require("ws")
const {SOCKET_URI} = process.env.SOCKET_URI
const ws = new WebSocket(SOCKET_URI)
let localStorage = []

ws.on("open", function greet() {
    interval = setInterval(async () => {
        await upd(localStorage)

        console.log("Data has landed to db \n")
        localStorage = []
    }, 3000)
})

ws.on("message", function receiving(data) {
    let msg = JSON.parse(data)
    //console.log(msg, typeof msg)
    let tempC = localStorage.find((sample) => sample.symbol === msg.symbol)
    if (!tempC) {
        localStorage.push({
            symbol: msg.symbol,
            minBid: msg.bid,
            minAsk: msg.ask,
            maxAsk: msg.ask,
            maxBid: msg.bid,
            timestamp: msg.timestamp,
        })
    } else {
        console.log(tempC, msg.bid)
        if (tempC.minBid > msg.bid) {
            tempC.minBid = msg.bid
        } else if (tempC.maxBid < msg.bid) {
            tempC.maxBid = msg.bid
        }
        if (tempC.minAsk > msg.ask) {
            tempC.minAsk = msg.ask
        } else if (tempC.maxAsk < msg.ask) {
            tempC.maxAsk = msg.ask
        }
    }
})

ws.on("close", function greet() {
    clearInterval(interval)
})

async function upd(localStorage) {
    console.log(localStorage)
    for (let i of localStorage) {
        let temp = await Data.exists({ symbol: i.symbol })
        if (!temp) {
            console.log("new symbol inserted", await Data.create(i))
        } else {
            await Data.updateOne({ symbol: i.symbol }, i)
            console.log("old symbol updated \n")
        }
    }
}
