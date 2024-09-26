const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../db'); // Import the database connection

// Storage for uploaded files using multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Update the upload variable to accept multiple files
const upload = multer({ storage: storage }).fields([
    { name: 'albumCover', maxCount: 1 },
    { name: 'mp3file', maxCount: 1 }
]);

const serveHomePage = (req, res) => {
    // Placeholder, this should now redirect to getAllSongs
    res.render('index');
};

const serveUploadPage = (req, res) => {
    res.render('upload');
};

const handleSongUpload = (req, res) => {
    const { songName, artistName } = req.body;
    const albumCover = req.files['albumCover'][0].filename; // For album cover
    const mp3file = req.files['mp3file'][0].filename; // For MP3 file

    // Insert the song details into the database
    const sql = 'INSERT INTO songs (songName, artistName, albumCover, mp3file) VALUES (?, ?, ?, ?)';

    db.query(sql, [songName, artistName, albumCover, mp3file], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send('Database error');
        }
        res.send(`Song uploaded successfully! <a href="/">Go Home</a>`);
    });
};

const searchSongs = (req, res) => {
    const searchTerm = req.query.q;
    const sql = 'SELECT * FROM songs WHERE songName LIKE ?';

    db.query(sql, [`%${searchTerm}%`], (err, results) => {
        if (err) {
            return res.status(500).send('Database error');
        }
        res.render('search', { songs: results });
    });
};

// Get all songs from the database
const getAllSongs = (req, res) => {
    const sql = 'SELECT * FROM songs'; // Adjust SQL based on your schema

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching songs:', err);
            return res.status(500).send('Database error');
        }
        res.render('index', { songs: results }); // Pass the songs to the index template
    });
};

module.exports = {
    serveHomePage,
    serveUploadPage,
    handleSongUpload,
    searchSongs,
    upload,
    getAllSongs, // Export the new function
};
