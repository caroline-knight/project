const authors = [
    {firstName: "Elif", lastName: "Shafak"}, 
    {firstName: "Vaishnavi", lastName: "Patel"}, 
    {firstName: "Kevin", lastName: "Wilson"}
]

exports.all = authors;

exports.upsert = (author) => {
  if (author.id) {
    exports.update (author);
  } else {
    exports.add(author);
  }
};

exports.add = (author) => {
  authors.push(author);
};

exports.update = (author) => {
  author.id = parseInt(author.id);
  authors[author.id] = author;
};

exports.get = (idx) => {
  return authors[idx];
};
