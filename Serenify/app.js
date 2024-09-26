const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const songRoutes = require('./routes/songRoutes.js');

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default to 3000

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); // Serve static files from public directory
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads'))); // Serve uploads directory
app.set('view engine', 'ejs'); // Set EJS as the view engine


// Routes
app.use('/', songRoutes); // Use song routes

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
