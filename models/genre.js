const genres = [
    {genreName: "fantasy"}, 
    {genreName: "contemporary fiction"}, 
    {genreName: "historical fiction"}
]

exports.all = genres;

exports.upsert = (genre) => {
  if (genre.id) {
    exports.update (genre);
  }
  else {
    exports.add(genre);
  }
};

exports.add = (genre) => {
  genres.push(genre);
};

exports.update = (genre) => {
  genre.id = parseInt(genre.id);
  genres[genre.id] = genre;
};

exports.get = (idx) => {
  return genres[idx];
};
