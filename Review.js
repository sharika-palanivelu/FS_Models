// models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    movieTitle: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    reviewText: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Review', reviewSchema);
