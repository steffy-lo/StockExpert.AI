const mongoose = require("mongoose");
const { StockSchema } = require('./Stock');
const { NewsArticleSchema } = require("./NewsArticle");
const { ArticleBreakdownSchema } = require('./ArticleBreakdown');
const { IPTCTopicSchema } = require('./IPTCTopic');
const { BehaviouralTraitSchema } = require('./BehaviouralTrait');
const { EmotionalTraitSchema } = require('./EmotionalTrait');
const { PeerSentimentSchema } = require('./PeerSentiment');
const { SentimentSchema } = require('./Sentiment');
const { TrendSchema } = require('./Trend');

const ResultSchema = new mongoose.Schema({
    stock: StockSchema,
    articles: [NewsArticleSchema],
    articleBreakdown: [ArticleBreakdownSchema],
    behaviouralTraits: [BehaviouralTraitSchema],
    emotionalTraits: [EmotionalTraitSchema],
    IPTCTopics: [IPTCTopicSchema],
    peerSentiment: [PeerSentimentSchema],
    sentiment: [SentimentSchema],
    trends: [TrendSchema]
},{
    timestamps: true
});

const Result = mongoose.models.Result || mongoose.model('Result', ResultSchema);

module.exports = { Result, ResultSchema };