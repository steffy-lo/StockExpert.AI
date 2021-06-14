const mongoose = require("mongoose");
const Stock = require('./Stock');
const NewsArticle = require("./NewsArticle");
const IPTCTopic = require('./IPTCTopic');
const BehaviouralTrait = require('./BehaviouralTrait');
const EmotionalTrait = require('./EmotionalTrait');
const PeerSentiment = require('./PeerSentiment');
const Sentiment = require('./Sentiment');
const Trend = require('./Trend');

const ResultSchema = new mongoose.Schema({
    stock: Stock,
    articles: [NewsArticle],
    behaviouralTraits: [BehaviouralTrait],
    emotionalTraits: [EmotionalTrait],
    IPTCTopics: [IPTCTopic],
    peerSentiment: [PeerSentiment],
    sentiment: [Sentiment],
    trends: [Trend]
});

const Result = mongoose.model('Result', ResultSchema);

module.exports = Result;