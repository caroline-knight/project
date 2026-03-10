const express = require('express'); // include express
const router = express.Router(); // define the router

router.get('/', function(req, res, next) {
    res.render('index', {title: 'bookedin'}); // rendering an object (title)
}); 

router.get('/about', function(req, res, next) {
    res.render('about', {title: 'bookedin');
});

module.exports = router; // JS requires exporting what is used in the other files.
