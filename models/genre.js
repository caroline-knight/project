const genres = [
    {genre: "Fantasy"}, 
    {genre: "Contemporary Fiction"}, 
    {genre: "Historical Fiction"}
]

exports.add = (genre) => {
  genres.push(genre);
}

exports.all = genres;