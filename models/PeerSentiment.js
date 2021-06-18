const mongoose = require("mongoose");

const PeerSentimentSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true
    },
    overall: {
        type: Number,
        required: true
    },
    negativity: {
        type: Number,
        required: true
    },
    positivity: {
        type: Number,
        required: true
    }
});

const PeerSentiment = mongoose.models.PeerSentiment || mongoose.model('PeerSentiment', PeerSentimentSchema);

module.exports = { PeerSentiment, PeerSentimentSchema };