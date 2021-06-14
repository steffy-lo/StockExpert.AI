const mongoose = require("mongoose");
const Stock = require("./Stock");
const Result = require("./Result");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    watchlist: [Stock],
    history: [Result]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;