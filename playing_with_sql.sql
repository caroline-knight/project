-- \c my_first_db

-- insert into authors (first_name, last_name) values ('Elif', 'Shafak');
-- insert into authors (first_name, last_name) values ('Vaishnavi', 'Patel');
-- insert into authors (first_name, last_name) values ('Kevin', 'Wilson');
-- insert into authors (first_name, last_name) values ('Martha', 'Wells');
-- insert into authors (first_name, last_name) values ('Liz', 'Shipton');
-- insert into authors (first_name, last_name) values ('Gus', 'Moreno');
-- insert into authors (first_name, last_name) values ('Lois', 'Lowry');
-- insert into authors (first_name, last_name) values ('Alyssa', 'Cole');

-- insert into genres (name) values ('science fiction');
-- insert into genres (name) values ('fantasy');
-- insert into genres (name) values ('romance');
-- insert into genres (name) values ('thriller');
-- insert into genres (name) values ('mystery');
-- insert into genres (name) values ('horror');
-- insert into genres (name) values ('historical fiction');
-- insert into genres (name) values ('contemporary fiction');


-- -- insert into books (title, publication_year, genre_id) values ('There Are Rivers in the Sky', 2024, (select id from genres where name = 'historical fiction'));
-- -- insert into books (title, publication_year, genre_id) values ('Kaikeyi', 2022, (select id from genres where name = 'historical fiction'));

-- -- INSERT into authors_books (author_id, book_id) values (1, 1);
-- -- INSERT into authors_books (author_id, book_id) values (1, 2);