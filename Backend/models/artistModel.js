const mongoose = require("mongoose")

const Schema = mongoose.Schema

const artistModel = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("artistModel", artistModel)