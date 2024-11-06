// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Create a new review
router.post('/', async (req, res) => {
    try {
        const { movieTitle, userName, reviewText, rating } = req.body;
        const newReview = new Review({ movieTitle, userName, reviewText, rating });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single review by ID
router.get('/:id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a review by ID
router.put('/:id', async (req, res) => {
    try {
        const { movieTitle, userName, reviewText, rating } = req.body;
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            { movieTitle, userName, reviewText, rating },
            { new: true }
        );
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a review by ID
router.delete('/:id', async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
