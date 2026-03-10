const books = [
    {title: "There Are Rivers in the Sky", publicationYear: 2024, authorIds: ["0", "1"], genreIds: ["0", "1"]}, 
    {title: "Kaikeyi", publicationYear: 2022, authorIds: ["0", "1"], genreIds: ["0", "1"]}, 
    {title: "Nothing to See Here", publicationYear: 2019, authorIds: ["0", "1"], genreIds: ["0", "1"]}
]

// ^^ we added authorIds above because we need to tell the form template that we have a potential author. an author has to be added to the book model. authorIDs has a string value to handle a JS equality peculiarity.

exports.all = books;

exports.upsert = (book) => {
  if (book.authorIds && ! Array.isArray(book.authorIds)) { 
      book.authorIds = [book.authorIds];
  }
  if (book.id) {
    exports.update (book);
  } else {
    exports.add(book);
  }
};

// ^^now when a value is submitted it will always be an array. this is to handle cases of multiple authors. it checks if the authorIds are set and if they are, if it's a list. if it's not a list, we will make it a list containing just the existing value.

exports.add = (book) => {
  books.push(book);
};

exports.update = (book) => {
  book.id = parseInt(book.id);
  books[book.id] = book;
};

exports.get = (idx) => {
  return books[idx];
};
