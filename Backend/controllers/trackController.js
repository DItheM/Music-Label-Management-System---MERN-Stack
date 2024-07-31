const Track = require("../models/trackModel")
const mongoose = require("mongoose")

// create new track
const createTrack = async (req, res) => {
    // const {title, artistId, age} = req.body

    try {
        const track = await Track.create({...req.body})
        res.status(200).json(track)
    } catch (error) {
        res.status(400).json({error: e.message})
    }
}

// get all tracks
const getTracks = async (req, res) => {
    const tracks = await Track.find({}).sort({createdAt: -1})

    if (tracks.length == 0) {
        return res.status(404).json({error: 'Tracks not found'})
    }

    res.status(200).json(tracks)
}

// get tracks for artist
const getArtistTracks = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Tracks not found'})
    }

    const tracks = await Track.find({artistId: id}).sort({createdAt: -1})

    if (tracks.length == 0) {
        return res.status(404).json({error: 'Tracks not found'})
    }

    res.status(200).json(tracks)
}


// get a single track
const getSingleTrack = async (req, res) => {
    const {id} = req.params 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Track not found'})
    }

    const track = await Track.findById(id)

    if (!track) {
        return res.status(404).json({error: 'Track not found'})
    }

    res.status(200).json(track)
}


// delete a track
const deleteTrack = async (req, res) => {
    const {id} = req.params 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Track not found'})
    }

    const track = await Track.findOneAndDelete({_id: id})

    if (!track) {
        return res.status(404).json({error: 'Track not found'})
    }

    res.status(200).json(track)
}

// update a track
const updateTrack = async (req, res) => {
    const {id} = req.params 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Track not found'})
    }

    const track = await Track.findOneAndUpdate({_id: id}, {...req.body})

    if (!track) {
        return res.status(404).json({error: 'Track not found'})
    }

    res.status(200).json(track)
}

module.exports = {
    createTrack,
    getTracks,
    getArtistTracks,
    getSingleTrack,
    deleteTrack,
    updateTrack
}