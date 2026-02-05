const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: String,
    category: String,
    author: String,
    price: String,
    imgBook: String
});

module.exports = mongoose.model('Book', bookSchema);