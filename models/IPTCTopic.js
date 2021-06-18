const mongoose = require("mongoose");

const IPTCTopicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
});

const IPTCTopic = mongoose.models.IPTCTopic || mongoose.model('IPTCTopic', IPTCTopicSchema);

module.exports = { IPTCTopic, IPTCTopicSchema };