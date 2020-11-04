const express = require("express")
const mongoose = require("mongoose")
const router = require("./router")
const socket = require("./ws")
const app = express()
try {
    mongoose
        .connect(
            "mongodb+srv://UserTest:12345@cluster0.ia5jk.mongodb.net/datas?retryWrites=true&w=majority",
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
