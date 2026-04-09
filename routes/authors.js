const express = require('express');

// '..' is used because you have to go up a directory. in contrast, '.' references your current directory.
const Author = require('../models/author'); 

const router = express.Router();

// connect to author model - call function from author model to get all data and wait for it to complete
router.get('/', function(req, res, next) {
  res.render('authors/index', { title: 'bookedin || authors', authors: Author.all });
});

// connect to author input form
router.get('/form', function(req, res, next) {
  res.render('authors/form', { title: 'bookedin || authors' });
});

// makes req.body into string because it is an object and needs to be printable. calls the model's 'add' method. redirects back to authors index page. replaced create with upsert, which stands for UPdate or inSERT, since we use this to both update and create.
router.post('/upsert', function(req, res, next) {
  console.log(JSON.stringify(req.body));
  Author.upsert(req.body);
  let createdOrupdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'success!',
    message: `this author has been ${createdOrupdated}!`,
  };
  res.redirect(303, "/authors");
});

// to handle the edit route
router.get('/edit', function(req, res, next) {
  let authorIdx = req.query.id
  let author = Author.get(authorIdx);
  res.render('authors/form', { title: 'bookedin || authors', author: author, authorIdx: authorIdx });
});

module.exports = router;
