const mongoose = require("mongoose")

const Schema = mongoose.Schema

const trackSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artistName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("track", trackSchema)