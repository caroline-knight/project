const express = require('express');
const router = express.Router();

router.get('/', function(_req, res, _next) {
    res.render('index', {title: 'bookedin'});
});
// rendering an object (title)

router.get('/about', function(_req, res, _next) {
    res.render('about');
})

module.exports = router;