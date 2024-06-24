const mongoose = require('mongoose')

const songSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required : [true, "Please enter a song name"]
        },
        artistname: {
            type: String,
            required: true,
        },
        genre: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
    }
)

const Song = mongoose.model('Song', songSchema);

module.exports = Song;