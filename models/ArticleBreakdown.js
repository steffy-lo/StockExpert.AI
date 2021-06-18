const mongoose = require("mongoose");

const ArticleBreakdownSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    sentiment: {
        type: Number,
        required: true
    },
    sentences: {
        type: [String],
        required: true
    }
});

const ArticleBreakdown = mongoose.models.ArticleBreakdown || mongoose.model('ArticleBreakdown', ArticleBreakdownSchema);

module.exports = { ArticleBreakdown, ArticleBreakdownSchema };