const genres = [
    {genreName: "Fantasy"}, 
    {genreName: "Contemporary Fiction"}, 
    {genreName: "Historical Fiction"}
]

exports.all = genres;

exports.add = (genre) => {
  genres.push(genre);
}

exports.get = (idx) => {
  return genres[idx];
}

exports.update = (genre) => {
  genre.id = parseInt(genre.id);
  genres[genre.id] = genre;
}

exports.upsert = (genre) => {
  if (genre.authorIds && ! Array.isArray(genre.authorIds)) {
    genre.authorIds = [genre.authorIds];
  }
  if (genre.id) {
    exports.update (genre);
  }
  else {
    exports.add(genre);
  }
}