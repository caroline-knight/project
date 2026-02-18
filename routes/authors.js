const express = require('express');
const router = express.Router();

const Author = require('../models/author');

router.get('/', function(_req, res, _next) {
  const authors = Author.all
  // const authors = [
  //   {firstName: "James S.A.", lastName: "Corey"}, 
  //   {firstName: "Craig", lastName: "Alanson"}, 
  //   {firstName: "Cixin", lastName: "Liu"}
  // ]
  res.render('authors/index', {title: 'bookedin || authors', authors: authors});
});

module.exports = router;