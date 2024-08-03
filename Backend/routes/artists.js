const express = require("express")
const {
    createArtist,
    getArtists,
    getSingleArtist,
    deleteArtist,
    updateArtist,
    searchArtist
} = require("../controllers/artistController")

const router = express.Router()

// create a track
router.post('/', createArtist)

// get all Artists
router.get('/get', getArtists)

// get a single Artist
router.get('/:id', getSingleArtist)

// delete Artist
router.delete('/:id', deleteArtist)

// update Artist
router.patch('/:id', updateArtist)

// search Artist
router.get('/', searchArtist)

module.exports = router