const Movie = require('../model/movie.model');
const fs = require('fs');
const path = require('path');

exports.movieList = async (req, res) => {
    let movies = await Movie.find();
    res.render('movieList', { movies });
};

exports.addPage = (req, res) => {
    res.render('movieAdd');
};

exports.movieAdd = async (req, res) => {
    try {
        let movies = await Movie.find();
        return res.render('movieAdd', { movies });
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
};

exports.addMovie = async (req, res) => {
    try {
        let imgpath = req.file ? `/uploads/${req.file.filename}` : '';
        await Movie.create({
            ...req.body,
            imgMovie: imgpath
        })
        res.redirect('/');

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
};

exports.deleteMovie = async (req, res) => {
    let id = req.params.id;
    let movies = await Movie.findById(id);

    if (!movies) {
        console.log("Movie not found..");
        return res.redirect('/');
    }

    if (movies.imgMovie != "") {
        let imgpath = path.join(__dirname, "..", movies.imgMovie);
        try {
            fs.unlinkSync(imgpath);
        } catch (error) {
            console.log('File is missing');
        }
    }

    await Movie.findByIdAndDelete(id);
    return res.redirect('/');
};

exports.editMovie = async (req, res) => {
    let movies = await Movie.findById(req.params.id);
    if (!movies) {
        console.log("Movie not found...");
        return res.redirect('/');
    }
    return res.render('editForm', { movies });
}

exports.updateMovie = async (req, res) => {
    let movies = await Movie.findById(req.params.id);

    if (!movies) {
        console.log('Movie is not found...')
        return res.redirect('/');
    }

    let imgpath;

    if (req.file) {
        if (movies.imgMovie != "") {
            imgpath = path.join(__dirname, '..', movies.imgMovie);
            try {
                fs.unlinkSync(imgpath);
            } catch {
                console.log('file missing');
            }
        }

        imgpath = `/uploads/${req.file.filename}`;
    }
    else {
        imgpath = movies.imgMovie;
    }

    movies = await Movie.findByIdAndUpdate(movies._id, { ...req.body, imgMovie: imgpath }, { new: true });
    return res.redirect('/');
}