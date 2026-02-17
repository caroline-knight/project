const express = require('express');
const router = express.Router();

router.get('/', function(_req, res, _next) {
  const genres = [
    "Fantasy", 
    "Contemporary Fiction", 
    "Science Fiction"
  ]
  res.render('genres/index', {title: 'bookedin || genres', genres: genres});
});

module.exports = router;