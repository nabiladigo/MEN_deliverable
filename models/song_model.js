const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        // required: true,
    },
    singer: {
        type: String,       
        // required: true,
    },
    image: {
        type: String,
        required: [true, "image can not be empty"],
    },
    date: {
        type: String,
    }
});

const Song = mongoose.model('Songs', songSchema);
module.exports = Song;