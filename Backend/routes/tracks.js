const express = require("express")
const {
    createTrack,
    getTracks,
    getArtistTracks,
    getSingleTrack,
    deleteTrack,
    updateTrack
} = require("../controllers/trackController")

const router = express.Router()

// create a track
router.post('/', createTrack)

// get all tracks
router.get('/', getTracks)

// get a single track
router.get('/:id', getSingleTrack)

// get artist tracks
router.get('/artist/:id', getArtistTracks)

// delete track
router.delete('/:id', deleteTrack)

// update track
router.patch('/:id', updateTrack)

module.exports = router