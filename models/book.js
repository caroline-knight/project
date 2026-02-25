const books = [
    {title: "There Are Rivers in the Sky", publicationYear: "2024"}, 
    {title: "Kaikeyi", publicationYear: "2022"}, 
    {title: "Nothing to See Here", publicationYear: "2019"}
]

exports.all = books;

exports.upsert = (book) => {
  if (book.id) {
    exports.update (book);
  } else {
    exports.add(book);
  }
}

exports.add = (book) => {
  books.push(book);
}

exports.update = (book) => {
  book.id = parseInt(book.id);
  books[book.id] = book;
}

exports.get = (idx) => {
  return books[idx];
}
