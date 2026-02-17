const express = require('express');
const router = express.Router();

router.get('/', function(_req, res, _next) {
  const books = [
    "There Are Rivers in the Sky", 
    "Kaikeyi", 
    "Nothing to See Here"
  ]
  res.render('books/index', {title: 'bookedin || books', books: books});
});

module.exports = router;