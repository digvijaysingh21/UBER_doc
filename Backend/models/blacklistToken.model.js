const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    //TTL (Time to Live) is the expiry time of the document in the collection
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 86400 // this is the expiry time in seconds 24 hours in seconds
    }
});

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);