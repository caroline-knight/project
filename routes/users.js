const express = require('express'); // include express
const router = express.Router(); // define the router

const User = require('../models/user');
const BookUser = require('../models/book_user');


// registration route
// can also create a separate 'helpers' file to make this function available. see week 7 slides.
function IsLoggedIn(req, res) { // creates reusable function
  if (req.session.currentUser) { // prevents logged in user from visiting the login and register pages.
    req.session.flash = {
      type: 'info',
      intro: 'error',
      message: 'you are already logged in',
    };
    res.redirect(303, '/'); // redirects user to home page
    return true;
  }
  return false;
};
router.get('/register', async (req, res, next) => {
  if (IsLoggedIn(req, res)) {
    return // if we are logged in already just return out of this route
  }
  res.render('users/register', { title: 'bookedin || registration' });
});

router.post('/register', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body));


// enforce unique email
  const user = User.getByEmail(req.body.email);
  if (user) {
    res.render('users/register', {
      title: 'bookedin || login',
      flash: {
        type: 'danger',
        intro: 'error',
        message: `a user with this email already exists`}
    });
  } else { // flash message
    User.add(req.body);
    req.session.flash = {
      type: 'info',
      intro: 'success!',
      message: `${req.body.name} has been created.`,
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
      message: 'welcome to bookedin.',
    };
    res.redirect(303, '/'); // redirects logged in user to the homepage
  } else { // if no user found/login failed: 
    res.render('users/login', {
      title: 'bookedin || login',
      // we can set the flash directly as a local variable being passed to the view. 
      flash: {
        type: 'danger',
        intro: 'error',
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

// profile route
router.get('/profile', async (req, res, next) => {
  if (! req.session.currentUser) {
    req.session.flash = {
      type: 'info',
      intro: 'error',
      message: 'you are not logged in yet'
    };
    res.redirect(303, '/');
  }
  if (helpers.isNotLoggedIn(req, res)) {
    return
  }
  const booksUser = BookUser.AllForUser(req.session.currentUser.email);
  booksUser.forEach((bookUser) => {
    bookUser.book = Book.get(bookUser.bookId)
  })
  res.render('users/profile',
    { title: 'bookedin || profile',
      user: req.session.currentUser,
      booksUser: booksUser });
});

module.exports = router;