const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/portfolioData.json');

// Helper to read data
const readData = () => {
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
};

// Helper to write data
const writeData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 4));
};

// GET all portfolio data
router.get('/portfolio', (req, res) => {
    try {
        const data = readData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error reading data' });
    }
});

// UPDATE portfolio data (Simplified for now - expects full object or partials)
router.post('/portfolio', (req, res) => {
    try {
        const newData = req.body;
        // Ideally, merge logic here. For now, we replace sections.
        // Or simpler: The admin sends the WHOLE Updated JSON structure.
        // Let's assume the client sends the specific section to update or the full object.

        let currentData = readData();
        const updatedData = { ...currentData, ...newData }; // Shallow merge

        writeData(updatedData);
        res.json({ message: 'Data updated successfully', data: updatedData });
    } catch (error) {
        res.status(500).json({ message: 'Error updating data' });
    }
});

module.exports = router;
