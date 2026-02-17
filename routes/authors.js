const express = require('express');
const router = express.Router();

router.get('/', function(_req, res, _next) {
  const authors = [
    "James S.A. Corey", 
    "Craig Alanson", 
    "Cixin Liu"
  ]
  res.render('authors/index', {title: 'bookedin || authors', authors: authors});
});

module.exports = router;