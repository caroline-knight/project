const express = require('express');
const router = express.Router();

const Book = require('../models/book');

router.get('/', function(_req, res, _next) {
  const books = Book.all
  res.render('books/index', {title: 'bookedin || books', books: books});
});

router.get('/form', async (_req, res, _next) => {
  res.render('books/form', {title: 'bookedin || books'});
});
 
router.post('/create', async (_req, res, _next) => {
  console.log('body: ' + JSON.stringify(req.body))
  Book.add(req.body);
  res.redirect(303, '/books')
});

module.exports = router;