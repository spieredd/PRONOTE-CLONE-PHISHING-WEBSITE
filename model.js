const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let victims = new Schema(
    {
        username: {
            type: String
        }
    }
)

module.exports = mongoose.model('victims', victims);