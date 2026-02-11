const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    title: String,
    description: String,
    genre: String,
    duration: String,
    imgMovie: String
});

module.exports = mongoose.model('movie', movieSchema);