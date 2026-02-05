const Book = require('../model/book.model');
const fs = require('fs');
const path = require('path');

exports.bookForm = async (req, res) => {
    try {
        let books = await Book.find();
        return res.render('bookForm', { books });
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
};

exports.addBook = async (req, res) => {
    try {
        let imgpath = req.file ? `/uploads/${req.file.filename}` : '';
        let book = await Book.create({
            ...req.body,
            imgBook: imgpath
        })
        res.redirect('/');

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
};

exports.editBook = async (req, res) => {
    let book = await Book.findById(req.params.id);
    if (!book) {
        console.log("Book not found...");
        return res.redirect('/');
    }
    return res.render('editForm', { book });
}

exports.updateBook = async (req, res) => {
    let book = await Book.findById(req.params.id);

    if (!book) {
        console.log('Book is not found...')
        return res.redirect('/');
    }

    let imgpath;

    if (req.file) {
        if (book.imgBook != "") {
            imgpath = path.join(__dirname, '..', book.imgBook);
            try {
                fs.unlinkSync(imgpath);
            } catch {
                console.log('file missing');
            }
        }

        imgpath = `/uploads/${req.file.filename}`;
    }
    else {
        imgpath = book.imgBook;
    }

    book = await Book.findByIdAndUpdate(book._id, { ...req.body, imgBook: imgpath }, { new: true });
    return res.redirect('/');
}

exports.deleteBook = async (req, res) => {
    let id = req.params.id;
    let book = await Book.findById(id);

    if (!book) {
        console.log("Book not found..");
        return res.redirect('/');
    }

    if (book.imgBook != "") {
        let imgpath = path.join(__dirname, "..", book.imgBook);
        try {
            fs.unlinkSync(imgpath);
        } catch (error) {
            console.log('File is missing');
        }
    }

    await Book.findByIdAndDelete(id);
    return res.redirect('/');
};