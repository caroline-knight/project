const express = require('express');
const router = express.Router();

const Author = require('../models/author');

// connect to author model
router.get('/', function(_req, res, _next) {
  const authors = Author.all
  res.render('authors/index', {title: 'bookedin || authors', authors: authors});
});

// connect to author button form
router.get('/form', async (_req, res, _next) => {
  res.render('authors/form', {title: 'bookedin || authors'});
});

// since req.body is an object, it must be made into a string to make it printable. this calls the model's 'add' method to pass that data along. redirects back to authors index page. 
router.post('/create', async (_req, res, _next) => {
  console.log('body: ' + JSON.stringify(req.body))
  Author.add(req.body);
  res.redirect(303, '/authors')
});

module.exports = router;