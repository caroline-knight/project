const express = require('express');
const router = express.Router();

const Book = require('../models/book');

router.get('/', function(req, res, next) {
  const books = Book.all
  res.render('books/index', {title: 'bookedin || books', books: books});
});

router.get('/form', async (req, res, next) => {
  res.render('books/form', {title: 'bookedin || books'});
});

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  Book.upsert(req.body);
  let createdOrupdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'success!',
    message: `this book has been ${createdOrupdated}!`,
  };
  res.redirect(303, '/books')
});

router.get('/edit', async (req, res, next) => {
  let bookIndex = req.query.id;
  let book = Book.get(bookIndex);
  res.render('books/form', {title: 'bookedin || books', book: book, bookIndex: bookIndex });
});


router.get('/show/:id', async (req, res, next) => {
  var templateVars = {
    title: "bookedin || show",
    book: await Book.get(req.params.id),
    bookIndex: req.params.id,
    // statuses: BookUser.statuses
  }
  // templateVars.comments = await Comment.AllForBook(templateVars.book);
  // templateVars.authors = await Author.allForBook(templateVars.book);
  // if (templateVars.book.genreId) {
  //   templateVars['genre'] = await Genre.get(templateVars.book.genreId);
  // }
  // if (req.session.currentUser) {
  //   templateVars['bookUser'] = await BookUser.get(templateVars.book, req.session.currentUser);
  // }
  res.render('books/show', templateVars);
});



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




module.exports = router;