'use strict'

const Book = require('../models/books');

module.exports = {
    getBooks: getBooks,
    createBook:createBook,
    getBookById:getBookById,
    deleteBook:deleteBook,
    responseToJson:responseToJson
}

function getBooks(req, res, next) {
    // Book.find(function (err, result) {
    //     if (err) {
    //         console.log('err', err);
    //     }

    //     req.resources.books = result;
    //     next()
    // })
    Book.find()
    .populate('user','email name details')
    .exec(function (err, result) {
        if (err) {
            console.log('err', err);
        }

        req.resources.books = result;
        return next()
    })
}

function createBook(req,res,next){
    const book = new Book(req.body);

    book.save(function (err, result) {
        if (err) {
            console.log('err', err);
        }

        req.resources.addBook=result;
        next();

    })
}

function getBookById(req, res, next) {
    Book.find({ _id: req.params['bookId'] }, function (err, result) {
        if (err) {
            console.log('err', err);
        }
        req.resources.books=result;
        next()
    })
}

function deleteBook(req,res,next){
    Book.deleteOne({ _id: req.params['bookId'] }, function (err, result) {
        if (err) {
            console.log('err', err);
        }

        req.resources.books=result;
        next()
    })
}

function responseToJson(prop){
    return function(req,res,next){
        res.json(req.resources[prop]);
    }
}