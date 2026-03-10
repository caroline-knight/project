const express = require('express');
const router = express.Router();

const helpers = require('./helpers');

// '..' is used because you have to go up a directory. in contrast, '.' references your current directory.
const Author = require('../models/author'); 

// connect to author model
router.get('/', function(req, res, next) {
  const authors = Author.all;
  res.render('authors/index', {title: 'bookedin || authors', authors: authors});
});

// connect to author input form
router.get('/form', async (req, res, next) => {
  res.render('authors/form', {title: 'bookedin || authors'});
});

// makes req.body into string because it is an object and needs to be printable. calls the model's 'add' method. redirects back to authors index page. replaced create with upsert, which stands for UPdate or inSERT, since we use this to both update and create.
router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body));
  Author.upsert(req.body);
  let createdOrupdated = "id" in req.body ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'success!',
    message: `this author has been ${createdOrupdated}!`,
  };
  res.redirect(303, '/authors');
});

// to handle the edit route
router.get('/edit', async (req, res, next) => {
  let authorIndex = req.query.id;
  let author = Author.get(authorIndex);
  res.render('authors/form', {title: 'bookedin || authors', author: author, authorIndex: authorIndex });
});

module.exports = router;