const express = require('express');
const router = express.Router();

const Genre = require('../models/genre');

router.get('/', function(_req, res, _next) {
  const genres = Genre.all
  res.render('genres/index', {title: 'bookedin || genres', genres: genres});
});

router.get('/form', async (_req, res, _next) => {
  res.render('genres/form', {title: 'bookedin || genres'});
});
 
router.post('/create', async (_req, res, _next) => {
  console.log('body: ' + JSON.stringify(req.body))
  Genre.add(req.body);
  res.redirect(303, '/books')
});

module.exports = router;