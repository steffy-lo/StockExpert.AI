const mongoose = require("mongoose");

const TrendSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true
    },
    period: {
        type: String,
        required: true
    },
    buy: {
        type: Number,
        required: true
    },
    hold: {
        type: Number,
        required: true
    },
    sell: {
        type: Number,
        required: true
    },
    strongBuy: {
        type: Number,
        required: true
    },
    strongSell: {
        type: Number,
        required: true
    }
});

const Trend = mongoose.models.Trend || mongoose.model('Trend', TrendSchema);

module.exports = { Trend, TrendSchema };