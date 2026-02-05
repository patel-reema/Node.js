const express = require('express');
const book = require('../controller/book.controller');
const { uploadImage } = require('../middleware/imgUpload');

const router = express.Router();

router.get('/', book.bookForm)
router.post('/add-book', uploadImage.single('imgBook'), book.addBook);
router.get('/edit-book/:id', book.editBook);
router.post('/update-book/:id', uploadImage.single('imgBook'), book.updateBook);
router.get('/delete-book/:id', book.deleteBook);

module.exports = router;