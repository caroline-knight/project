const express = require('express'); // include express
const router = express.Router(); // define the router

const User = require('../models/user');

// registration route
router.get('/register', async (req, res, next) => {
  res.render('users/register', { title: 'bookedin || register'});
});

router.post('/register', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body));

  // enforce unique email
  const user = User.getByEmail(req.body.email);
  if (user) {
    res.render('users/register', {
      title: 'BookedIn || Login',
      flash: {
        type: 'danger',
        intro: 'Error!',
        message: `A user with this email already exists`}
    });
  } else { // flash message
    User.add(req.body);
    req.session.flash = {
      type: 'info',
      intro: 'success!',
      message: `${req.body.name} has been created!`,
  };
    res.redirect(303, '/');
  }
});

// login route
router.get('/login', async (req, res, next) => {
  res.render('users/login', { title: 'bookedin || login'});
});

router.post('/login', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body));
  const user = User.login(req.body); 
  if (user) { // if user is found, logs in the user
    req.session.currentUser = user // we store this user on the session 
    req.session.flash = { // sets flash message
      type: 'info',
      intro: 'success!',
      message: 'welcome to bookedin!',
    };
    res.redirect(303, '/'); // redirects logged in user to the homepage
  } else { // if no user found/login failed: 
    res.render('users/login', {
      title: 'bookedin || login',
      // we can set the flash directly as a local variable being passed to the view. 
      flash: {
        type: 'danger',
        intro: 'error!',
        message: `user not found. reenter email and password or register as a new user.`}
    });
  }
});

// logout route
router.post('/logout', async (req, res, next) => {
  delete req.session.currentUser
  req.session.flash = {
    type: 'info',
    intro: 'success!',
    message: 'you have logged out',
  };
  res.redirect(303, '/');
});

module.exports = router;