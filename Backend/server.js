require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const trackRoutes = require("./routes/tracks")
const artistRoutes = require("./routes/artists")

// express app
const app = express()

app.use(express.json())

app.use('/tracks', trackRoutes)
app.use('/artists', artistRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log("Connected to db & listening on port", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })