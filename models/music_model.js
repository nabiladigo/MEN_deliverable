const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    song: {
        type: String,
        required: true
    },
    singer: {
        type: String,
        
        required: true,
    },
    image: {
        type: String,
        required: [true, "image can not be empty"],
    },
    date: {
        type: String,
    }
});

const Music = mongoose.model('Music', musicSchema);
module.exports = Music;