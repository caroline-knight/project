const authors = [
    {firstName: "James S.A.", lastName: "Corey"}, 
    {firstName: "Craig", lastName: "Alanson"}, 
    {firstName: "Cixin", lastName: "Liu"}
]

// this pushes the author received into the list of known authors. 
exports.add = (author) => {
  authors.push(author);
}

exports.all = authors;