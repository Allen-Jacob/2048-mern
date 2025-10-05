// Script de migration pour ajouter le champ 'game' aux scores existants
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const ScoreSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    score: { type: Number, required: true, min: 0 },
    game: { type: String, required: false },
    date: { type: Date, default: Date.now }
});

const Score = mongoose.model('Score', ScoreSchema);

async function migrate() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Mettre à jour tous les scores sans champ 'game' pour les attribuer à '2048'
        const result = await Score.updateMany(
            { game: { $exists: false } },
            { $set: { game: '2048' } }
        );

        console.log(`✅ Migration terminée: ${result.modifiedCount} scores mis à jour`);

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('❌ Erreur de migration:', error);
        process.exit(1);
    }
}

migrate();
