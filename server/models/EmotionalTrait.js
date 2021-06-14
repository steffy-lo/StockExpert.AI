const mongoose = require("mongoose");

const EmotionalTraitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
});

const EmotionalTrait = mongoose.model('EmotionalTrait', EmotionalTraitSchema);

module.exports = EmotionalTrait;