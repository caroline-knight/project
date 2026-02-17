const express = require('express');
const handlebars = require('express-handlebars').create();
const indexRouter = require('./routes/index');
const authorsRouter = require('./routes/authors');
const booksRouter = require('./routes/books');
const genresRouter = require('./routes/genres');

const app = express();
const port = 3000;

app.engine ('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use('/', indexRouter);
app.use('/authors', authorsRouter);
app.use('/books', booksRouter);
app.use('/genres', genresRouter);

// custom 404 page
app.use((_req, res) => {
  res.status(404);
  res.send("<h1>404 - not found</h1>");
})

// custom 500 page
app.use((err, _req, res, _next) => {
  console.error(err.message);
  res.status(500);
  res.send("<h1>500 - server error</h1>");
})

// makes app listen to the port
app.listen(port, () => console.log(
`express started on http://localhost:${port}; ` +
`press ctrl-c to terminate.`));