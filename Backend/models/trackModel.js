const mongoose = require("mongoose")

const Schema = mongoose.Schema

const trackSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artistId: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: false
    },
    targetStartDate: {
        type: Date,
        required: false
    },
    targetReleaseDate: {
        type: Date,
        required: false
    }
}, {timestamps: true})

module.exports = mongoose.model("trackModel", trackSchema)