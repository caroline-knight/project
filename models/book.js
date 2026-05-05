// const books = [
//     {title: "There Are Rivers in the Sky", publicationYear: 2024, authorIds: ["0", "1"], genreIds: ["0", "1"]}, 
//     {title: "Kaikeyi", publicationYear: 2022, authorIds: ["0", "1"], genreIds: ["0", "1"]}, 
//     {title: "Nothing to See Here", publicationYear: 2019, authorIds: ["0", "1"], genreIds: ["0", "1"]}
// ];
// ^^ we added authorIds above because we need to tell the form template that we have a potential author. an author has to be added to the book model. authorIDs has a string value to handle a JS equality peculiarity.

const db = require('../database');

exports.all = async () => {
  const { rows } = await db.getPool().query("select * from books order by id");
  return db.camelize(rows);
};

exports.get = async (id) => {
  const { rows } = await db.getPool().query("select * from books where id = $1", [id])
  return db.camelize(rows) [0]
};

exports.add = async (book) => {
  const { rows } = await db.getPool()
  .query("INSERT INTO books(title, publication_year, genre_id) VALUES($1, $2, $3) RETURNING*",
    [book.title, book.publicationYear, book.genreId]);
  let newBook = db.camelize(rows)[0]
  await addAuthorsToBook(newBook, book.authorIds)
  return newBook
};

exports.update = async (book) => {
  const { rows } = await db.getPool()
  .query ("UPDATE books SET title = $1, publication_year = $2, genre_id = $3 where id = $4 RETURNING *",
    [book.title, book.publicationYear, book.genreId, book.id]);
  let newBook = db.camelize(rows)[0]
  await deleteAuthorsForBook(newBook) // by first deleting the relevant authors_books records, we prevent accidental duplicates
  await addAuthorsToBook(newBook, book.authorIds)
  return newBook
};

const addAuthorsToBook = async (book, authorIds) => {
  authorIds.forEach(async (authorId) => {
    await db.getPool().query(`
      INSERT INTO authors_books(author_id, book_id) values($1,$2)
      `,[authorId,book.id])
  })
};
const DeleteAuthorsForBook = async (book) => {
  db.getPool().query(`DELETE from authors_books where book_id = $1`, [book.id]);
};

exports.upsert = (book) => {
  if (book.authorIds && !
    Array.isArray(book.authorIds)) {
    book.authorIds = [book.authorIds];
  }
  if (book.id) {
    return exports.update(book);
  } else {
    return exports.add(book);
  }
};