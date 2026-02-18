const authors = [
    {firstName: "Elif", lastName: "Shafak"}, 
    {firstName: "Vaishnavi", lastName: "Patel"}, 
    {firstName: "Kevin", lastName: "Wilson"}
]

// this pushes the author received into the list of known authors. 
exports.add = (author) => {
  authors.push(author);
}

exports.all = authors;