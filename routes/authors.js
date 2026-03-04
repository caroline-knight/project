const express = require('express');
const router = express.Router();

const Author = require('../models/author');

// connect to author model
router.get('/', function(req, res, next) {
  const authors = Author.all
  res.render('authors/index', {title: 'bookedin || authors', authors: authors});
});

// connect to author input form
router.get('/form', async (req, res, next) => {
  res.render('authors/form', {title: 'bookedin || authors'});
});

// to handle the edit route
router.get('/edit', async (req, res, next) => {
  let authorIndex = req.query.id;
  let author = Author.get(authorIndex);
  res.render('authors/form', {title: 'bookedin || authors', author: author, authorIndex: authorIndex });
});

// makes req.body into string because it is an object and needs to be printable. calls the model's 'add' method. redirects back to authors index page. we replaced create with upsert. 
router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body));
  Author.upsert(req.body);
  let createdOrupdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'success!',
    message: `this author has been ${createdOrupdated}!`,
  };
  res.redirect(303, '/authors');
});

module.exports = router;