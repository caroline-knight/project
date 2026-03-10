// framework imports
const express = require('express');
const path = require('path');
const {credentials} = require('./config');
const handlebars = require('express-handlebars').create({
  helpers: { // handlebars helpers
    eq: (v1, v2) => v1 == v2, // normal equals to compare 2 values
    ne: (v1, v2) => v1 != v2, // normal not equals to compare 2 values
    lt: (v1, v2) => v1 < v2, // less than to compare 2 values
    gt: (v1, v2) => v1 > v2, // greater than to compare 2 values
    lte: (v1, v2) => v1 <= v2, // less than or equal to to compare 2 values
    gte: (v1, v2) => v1 >= v2, // greater than or equal to to compare 2 values
    and() {
        return Array.prototype.every.call(arguments, Boolean);
        // will return true if each element in the array is true
    },
    or() {
        return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
        // will return true if at least one element in the array is true
    }, 
    // given an id and a list of objects, check if there is an object with that given id
    someId: (arr, id) => arr && arr.some(obj => obj.id == id),
    in: (arr, obj) => arr && arr.some(val => val == obj), // check if an elemtn is in an array
    dateStr: (v) => v && v.toLocaleDateString("en-US") // helper function to display dates
  }
});
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
// const csrf = require('csurf');

// application imports
const indexRouter = require('./routes/index');
const authorsRouter = require('./routes/authors');
const booksRouter = require('./routes/books');
const genresRouter = require('./routes/genres');

// framework setup
const app = express();
const port = 3000;

app.engine ('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser(credentials.cookieSecret));
app.use(expressSession({
  secret: credentials.cookieSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));

// session configuration 
app.use((req, res, next) => { // this code is executed for every request (no filter)
  res.locals.flash = req.session.flash // makes it possible to use flash messages and pass them to the view. sets a local variable (variables are passed to handlebars)
  delete req.session.flash // removes the flash from the session cookie
  next() // continue handling the request
});

// application setup. the first argument of app.use() is a string. it will use that string to determine when to use the function.
app.use('/', indexRouter);
app.use('/authors', authorsRouter);
app.use('/books', booksRouter);
app.use('/genres', genresRouter);

// 404 page
app.use((_req, res) => {
  res.status(404);
  res.send("<h1>404 - page not found on server</h1>");
})

// 500 page
app.use((err, _req, res, _next) => {
  console.error(err.message);
  res.status(500);
  res.send("<h1>500 server error</h1>");
})

// makes app listen to the port
app.listen(port, () => console.log(
`express started on http://localhost:${port}; ` +
`press ctrl-c to terminate.`));
