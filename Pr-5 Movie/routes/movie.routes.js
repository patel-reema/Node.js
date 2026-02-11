const express = require('express');
const movie = require('../controller/movie.controller');
const { uploadImage } = require('../middleware/poster');

const router = express.Router();

router.get('/', movie.movieList);
router.get('/add', movie.addPage);

router.post('/add-movie', uploadImage.single('imgMovie'), movie.addMovie);
router.get('/edit-movie/:id', movie.editMovie);
router.post('/update-movie/:id', uploadImage.single('imgMovie'), movie.updateMovie);
router.get('/delete-movie/:id', movie.deleteMovie);

module.exports = router;