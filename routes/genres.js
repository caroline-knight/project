const express = require('express');
const router = express.Router();

// '..' is used because you have to go up a directory. in contrast, '.' references your current directory.
const Genre = require('../models/genre');

// connect to genre model
router.get('/', function(req, res, next) {
  const genres = Genre.all;
  res.render('genres/index', {title: 'bookedin || genres', genres: genres});
});

// connect to genre input form
router.get('/form', async (req, res, next) => {
  res.render('genres/form', {title: 'bookedin || genres'});
});

// to handle the edit route
router.get('/edit', async (req, res, next) => {
  let genreIndex = req.query.id;
  let genre = Genre.get(genreIndex);
  res.render('genres/form', {title: 'bookedin || genres', genre: genre, genreIndex: genreIndex });
});

// makes req.body into string because it is an object and needs to be printable. calls the model's 'add' method. redirects back to authors index page. replaced create with upsert, which stands for UPdate or inSERT, since we use this to both update and create.
router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body));
  Genre.upsert(req.body);
  let created0rupdated = "id" in req.body ? 'updated' : 'created' // if id was part of the body it updates
  req.session.flash = {
     // a flash message informs the user something happened after 'posting' data. create a flash by setting it on the session. we make it an object for future-proofing. for now we only use the message. more code was added to the bookedin.js file because to see the flash message we have to pass it to the front end. 
      type: 'info',
      intro: 'success!',
      message: `this genre has been ${created0rupdated}!`,
  };
  res.redirect(303, '/genres');
});

module.exports = router;