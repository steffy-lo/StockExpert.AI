const mongoose = require("mongoose");
const { StockSchema } = require("./Stock");
const { ResultSchema } = require("./Result");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    watchlist: [StockSchema],
    history: [ResultSchema]
});

const User = mongoose.models.User ||mongoose.model('User', UserSchema);

module.exports = { User, UserSchema };