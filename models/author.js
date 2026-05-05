const db = require('../database');

exports.all = async () => { // async because we are calling out to the database
  const { rows } = await db.getPool() // get a db connection from the pool
  .query("select * from authors order by id"); // query authors table
  return db.camelize(rows); // return camel cased data
};

exports.get = async (id) => {
  const { rows } = await db.getPool().query("select * from authors where id = $1", 
    [id]);
  return db.camelize(rows)[0]
}

exports.add = async (author) => {
  await db.getPool().query("insert into authors (first_name, last_name) values ($1, $2);", 
    [author.firstName, author.lastName]);
};

exports.update = async (author) => {
  await db.getPool().query("update authors set first_name = $1, last_name = $2 where id = $3;",
    [author.firstName, author.lastName, author.id]
  );
};

exports.upsert = (author) => {
  if (author.id) {
    exports.update(author);
  } else {
    exports.add(author);
  }
};

exports.allForBook = async (book) => {
  const { rows } = await db.getPool().query(`
    select authors.* from authors
    JOIN authors_books on authors_books.author_id = authors.id
    where authors_books.book_id = $1;`, [book.id]);
  return db.camelize(rows);
};