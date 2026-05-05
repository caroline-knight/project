const db = require('../database');

exports.all = async () => { 
  const { rows } = await db.getPool().query("select * from genres order by id");
  return db.camelize(rows);
};

exports.get = async (id) => {
  const { rows } = await db.getPool().query("select * from genres where id = $1", 
    [id]);
  return db.camelize(rows)[0]
}

exports.add = async (name) => {
  await db.getPool().query("insert into genres (name) values ($1) returning *;", 
    [genre.name]);
};

exports.update = async (id, name) => {
  await db.getPool().query("update genres set name = $1 where id = $2 returning *;",
    [genre.name, genre.id]);
};

exports.upsert = (genre) => {
  if (genre.id) {
    return exports.update(genre.id, genre.name);
  } else {
    return exports.add(genre.name);
  }
};