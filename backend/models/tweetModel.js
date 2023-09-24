const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema(
    {
        content: {
            type: String,
            required: true

        },
        user_id: {
            type: String,
            required: [true, "Please enter a user id"]
        }
    },
    {
        timestamps: true
    }
)

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;