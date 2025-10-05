// server/models/Score.js
const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    score: {
        type: Number,
        required: true,
        min: 0,
    },
    game: {
        type: String,
        required: true,
        enum: ['2048', 'snake', 'pong', 'flappybird'],
        default: '2048',
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Score', ScoreSchema);

