require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const trackRoutes = require("./routes/tracks")
const artistRoutes = require("./routes/artists")
const cors = require("cors");

// express app
const app = express()

app.use(cors())

app.use(express.json())

app.post('/signin', (req, res)=>{
    if (req.body.username == 'admin' && req.body.password == 'admin') {
        res.status(200).json({mssg: "Signed in"})
    } else {
        res.status(400).json({error: "Username or password is invalid"})
    }
})

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