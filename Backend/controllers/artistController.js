const Artist = require("../models/artistModel")
const mongoose = require("mongoose")

// create new artist
const createArtist = async (req, res) => {
    // const {title, artistId, age} = req.body

    try {
        const artist = await Artist.create({...req.body})
        res.status(200).json(artist)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// get all artists
const getArtists = async (req, res) => {
    const artists = await Artist.find({}).sort({createdAt: -1})

    if (artists.length == 0) {
        return res.status(404).json({error: 'artists not found'})
    }

    res.status(200).json(artists)
}

// get a single artist
const getSingleArtist = async (req, res) => {
    const {id} = req.params 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'artist not found'})
    }

    const artist = await Artist.findById(id)

    if (!artist) {
        return res.status(404).json({error: 'artist not found'})
    }

    res.status(200).json(artist)
}


// delete a artist
const deleteArtist = async (req, res) => {
    const {id} = req.params 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'artist not found'})
    }

    const artist = await Artist.findOneAndDelete({_id: id})

    if (!artist) {
        return res.status(404).json({error: 'artist not found'})
    }

    res.status(200).json(artist)
}

// update a artist
const updateArtist = async (req, res) => {
    const {id} = req.params 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'artist not found'})
    }

    const artist = await Artist.findOneAndUpdate({_id: id}, {...req.body})

    if (!artist) {
        return res.status(404).json({error: 'artist not found'})
    }

    res.status(200).json(artist)
}

// search artist
const searchArtist = async (req, res) => {
    const query = req.query.q;
    try {
        const artists = await Artist.find({
            name: { $regex: query, $options: 'i' } // Case-insensitive search
        }).limit(10); // Limit results
        res.json(artists);
    } catch (error) {
        res.status(200).json({ error: error.message });
    }
}

module.exports = {
    createArtist,
    getArtists,
    getSingleArtist,
    deleteArtist,
    updateArtist,
    searchArtist
}