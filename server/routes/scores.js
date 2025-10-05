// server/routes/scores.js
const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

// POST /api/scores - Register a new score
router.post('/', async (req, res) => {
    const { name, score, game } = req.body;

    if (!name || typeof score !== 'number' || !game) {
        return res.status(400).json({ message: 'Name, score, and game are required.' });
    }

    try {
        const newScore = new Score({ name, score, game });
        await newScore.save();
        res.status(201).json(newScore);
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});

// GET /api/scores - Get highest scores
router.get('/', async (req, res) => {
    const { game } = req.query;

    try {
        let filter = {};
        if (game) {
            // Pour 2048, inclure aussi les scores sans champ 'game' (anciens scores)
            if (game === '2048') {
                filter = { $or: [{ game: '2048' }, { game: { $exists: false } }] };
            } else {
                filter = { game };
            }
        }

        const topScores = await Score.find(filter).sort({ score: -1 }).limit(10);
        res.json(topScores);
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;

