const mongoose = require("mongoose");

const BehaviouralTraitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
});

const BehaviouralTrait = mongoose.model('BehaviouralTrait', BehaviouralTraitSchema);

module.exports = BehaviouralTrait;