const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    o: {
        type: Number,
        required: true
    },
    h: {
        type: Number,
        required: true
    },
    l: {
        type: Number,
        required: true
    },
    c: {
        type: Number,
        required: true
    },
    pc: {
        type: Number,
        required: true
    }
});

const Stock = mongoose.models.Stock || mongoose.model('Stock', StockSchema);

module.exports = { Stock, StockSchema };