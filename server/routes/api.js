const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const initialData = require('../data/portfolioData.json');

// GET all portfolio data
router.get('/portfolio', async (req, res) => {
    try {
        let data = await Portfolio.findOne();

        // Seed initial data if DB is empty
        if (!data) {
            data = await Portfolio.create(initialData);
        }

        res.json(data);
    } catch (error) {
        console.error('Error fetching portfolio data:', error);
        res.status(500).json({ message: 'Error reading data' });
    }
});

// UPDATE portfolio data
router.post('/portfolio', async (req, res) => {
    try {
        const newData = req.body;

        // Updates the single portfolio document, or creates it if it doesn't exist
        // Note: This replaces top-level fields given in newData, but for nested arrays, 
        // it might replace the whole array if provided.
        // Given the frontend likely sends the structured sections, this should work fine.

        const updatedData = await Portfolio.findOneAndUpdate(
            {},
            newData,
            { new: true, upsert: true } // upsert: create if not exists
        );

        res.json({ message: 'Data updated successfully', data: updatedData });
    } catch (error) {
        console.error('Error updating portfolio data:', error);
        res.status(500).json({ message: 'Error updating data' });
    }
});

module.exports = router;
