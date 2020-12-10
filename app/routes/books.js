'use strict'

const express = require('express');
const router = express.Router();
const bookController = require('../controllers/books');

router.get('/books',
    bookController.getBooks,
    bookController.responseToJson('books')
);

router.get('/bookById/:bookId',
    bookController.getBookById,
    bookController.responseToJson('books')
);

router.post('/books',
    bookController.createBook,
    bookController.responseToJson('addBook')
);

router.post('/deleteBook/:bookId',
    bookController.deleteBook,
    bookController.responseToJson('books')
)

module.exports = router;