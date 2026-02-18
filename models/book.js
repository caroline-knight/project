const books = [
    {title: "There Are Rivers in the Sky", publicationYear: "2024"}, 
    {title: "Kaikeyi", publicationYear: "2022"}, 
    {title: "Nothing to See Here", publicationYear: "2019"}
]

exports.add = (book) => {
  books.push(book);
}

exports.all = books;