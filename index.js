// index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Review = require('./models/Review');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

console.log("MongoDB URI:", process.env.MONGODB_URI);


// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));



// Routes
app.use('/api/reviews', require('./routes/reviewRoutes'));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const path = require('path');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
