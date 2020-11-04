const express = require("express")
const mongoose = require("mongoose")
const router = require("./router")
const socket = require("./ws")
const app = express()
const {MONGO_URI} = process.env.MONGO_URI
try {
    mongoose
        .connect(
            MONGO_URI,
            { useNewUrlParser: true, useUnifiedTopology: true }
        )
        .then(() => console.log("Connection is open"))
        .catch((err) => {
            console.error(err)
        })
} catch (err) {
    console.log(err.toString())
}

app.use(router)

app.listen(3000)
