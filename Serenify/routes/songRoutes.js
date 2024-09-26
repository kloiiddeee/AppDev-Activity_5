const express = require('express');
const {
    serveHomePage,
    serveUploadPage,
    handleSongUpload,
    searchSongs,
    upload,
    getAllSongs // Import the new function
} = require('../controllers/songController.js');

const router = express.Router();

// Serve home page and fetch all songs
router.get('/', getAllSongs); // Call the function to fetch songs

// Serve upload page
router.get('/upload', serveUploadPage);

// Handle song upload
router.post('/upload', upload, handleSongUpload);

// Search song by name
router.get('/search', searchSongs);

module.exports = router;

