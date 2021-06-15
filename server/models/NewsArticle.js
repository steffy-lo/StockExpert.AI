const mongoose = require("mongoose");

const NewsArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const NewsArticle = mongoose.models.NewsArticle || mongoose.model('NewsArticle', NewsArticleSchema);

module.exports = { NewsArticle, NewsArticleSchema };