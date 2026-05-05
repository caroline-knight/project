const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require ('../models/genre');
const BookUser = require ('../models/book_user');
const Comment = require('../models/comment');

// '..' is used because you have to go up a directory. in contrast, '.' references current directory.

router.get('/', async (req, res, next) => {
  const books = await Book.all()
  res.render('books/index', {title: 'bookedin || books', books: books});
});

router.get('/form', async (req, res, next) => {
  res.render('books/form', {title: 'bookedin || books', authors: await Author.all(), genres: await Genre.all() });
});

router.get('/edit', async (req, res, next) => {
  let bookId = req.query.id;
  let book = await Book.get(bookId);
  book.authorIds = (await Author.AllForBook(book)).map(author => author.id);
  res.render('books/form', {
    title: 'bookedin || books', 
    book: book, 
    authors: await Author.all(), 
    genres: await Genre.all() 
  });
});

router.get('/show/:id', async (req, res, next) => {
  const book = await Book.get(req.params.id) // minor refactor, pulling the book out of templateVars. it lets us write shorter code. Everywhere that we had to use templateVars.book, we can now just use book
  let templateVars = {
    title: 'BookedIn || Books',
    book: book,
    bookId: req.params.id,
    statuses: BookUser.statuses,
    comments: await Comment.AllForBook(book)
  }
  book.authors = await Author.AllForBook(book);
  if (book.genreId) {
    templateVars['genre'] = await Genre.get(book.genreId);
  }
  if (req.session.currentUser) {
    templateVars['bookUser'] = await BookUser.get(book, req.session.currentUser);
  }
  res.render('books/show', templateVars);
});

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body));
  await Book.upsert(req.body);
  let createdOrupdated = "id" in req.body ? 'updated' : 'created'; // if id was part of the body it's update
  req.session.flash = { 
    // a flash message informs the user something happened after 'posting' data. create a flash by setting it on the session. we make it an object for future-proofing. for now we only use the message. more code was added to the bookedin.js file because to see the flash message we have to pass it to the front end. 
    type: 'info',
    intro: 'success!',
    message: `${req.body.title} has been ${createdOrupdated}!`,
  };
  res.redirect(303, '/books')
});

module.exports = router;