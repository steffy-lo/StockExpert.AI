const mongoose = require("mongoose");

const SentimentSchema = new mongoose.Schema({
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

const Sentiment = mongoose.model('Trend', SentimentSchema);

module.exports = Sentiment;