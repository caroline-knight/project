const express = require('express');
const router = express.Router();

const Book = require('../models/book');

router.get('/', function(req, res, next) {
  const books = Book.all
  res.render('books/index', {title: 'bookedin || books', books: books});
});

router.get('/form', async (req, res, next) => {
  res.render('books/form', {title: 'bookedin || books'});
});

router.get('/edit', async (req, res, next) => {
  let bookIndex = req.query.id;
  let book = Book.get(bookIndex);
  res.render('books/form', {title: 'bookedin || books', book: book, bookIndex: bookIndex });
});

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  Book.upsert(req.body);
  res.redirect(303, '/books')
});


module.exports = router;