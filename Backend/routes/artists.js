const express = require("express")
const {
    createArtist,
    getArtists,
    getSingleArtist,
    deleteArtist,
    updateArtist
} = require("../controllers/artistController")

const router = express.Router()

// create a track
router.post('/', createArtist)

// get all Artists
router.get('/', getArtists)

// get a single Artist
router.get('/:id', getSingleArtist)

// delete Artist
router.delete('/:id', deleteArtist)

// update Artist
router.patch('/:id', updateArtist)

module.exports = router