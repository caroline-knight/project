const express = require('express');
const router = express.Router();

// '..' is used because you have to go up a directory. in contrast, '.' references your current directory.
const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require ('../models/genre');


router.get('/', function(req, res, next) {
  const books = Book.all;
  res.render('books/index', {title: 'bookedin || books', books: books});
});

router.get('/form', async (req, res, next) => {
  res.render('books/form', {title: 'bookedin || books', authors: Author.all, genres: Genre.all});
});

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body));
  Book.upsert(req.body);
  let createdOrupdated = "id" in req.body ? 'updated' : 'created'; // if id was part of the body it's update
  req.session.flash = { 
    // a flash message informs the user something happened after 'posting' data. create a flash by setting it on the session. we make it an object for future-proofing. for now we only use the message. more code was added to the bookedin.js file because to see the flash message we have to pass it to the front end. 
    type: 'info',
    intro: 'success!',
    message: `this book has been ${createdOrupdated}!`,
  };
  res.redirect(303, '/books')
});

router.get('/edit', async (req, res, next) => {
  let bookIndex = req.query.id;
  let book = Book.get(bookIndex);
  res.render('books/form', {title: 'bookedin || books', book: book, bookIndex: bookIndex, authors: Author.all, genres: Genre.all });
});

router.get('/show/:id', async (req, res, next) => {
  var templateVars = {
    title: "bookedin || show",
    book: Book.get(req.params.id),
    bookIndex: req.params.id,
    // statuses: BookUser.statuses
  }
  if (templateVars.book.authorIds) {
    templateVars['authors'] = templateVars.book.authorIds.map((authorId) => 
      Author.get(authorId))
  }
  if ("genreId" in templateVars.book) {
    templateVars['genre'] = Genre.get(templateVars.book.genreId);
  }
});

module.exports = router;



// draft code:
    // templateVars.comments = await Comment.AllForBook(templateVars.book);
    // templateVars.authors = await Author.allForBook(templateVars.book);
    // if (templateVars.book.genreId) {
    //   templateVars['genre'] = await Genre.get(templateVars.book.genreId);
    // }
    // if (req.session.currentUser) {
    //   templateVars['bookUser'] = await BookUser.get(templateVars.book, req.session.currentUser);
    // }

    // let templateVars = {
    //   title: 'bookedin' || 'books',
    //   book: Book.get(req.params.id),
    //   bookIndex = req.params.id
    // }
    // if ("authorId" in templateVars.book) { 
    //     templateVars['author'] = Author.get(templateVars.book.authorId);
    // }
    // res.render('books/show', templateVars);

    // let bookIndex = req.params.id;
    // let book = Book.get(bookIndex);
    // let author = author.get(book.authorId);
    // let authors = []
    // if (book.authorIds) {
    //   authors = book.authorIds.map(author.get)
    // }
    // if (templateVars.book.authorIds) {
    //     templateVars['authors'] = templateVars.book.authorIds.map((authorId) => author.get(authorId))
    // }
    // res.render('books/show', { title: 'bookedin' || 'book', book: book, bookIndex: bookIndex, author: author});
