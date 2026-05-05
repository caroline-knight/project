\c my_first_db

insert into authors (first_name, last_name) values ('Elif', 'Shafak');
insert into authors (first_name, last_name) values ('Vaishnavi', 'Patel');
insert into authors (first_name, last_name) values ('Kevin', 'Wilson');
insert into authors (first_name, last_name) values ('Martha', 'Wells');
insert into authors (first_name, last_name) values ('Liz', 'Shipton');
insert into authors (first_name, last_name) values ('Gus', 'Moreno');
insert into authors (first_name, last_name) values ('Lois', 'Lowry');
insert into authors (first_name, last_name) values ('Alyssa', 'Cole');

insert into genres (name) values ('science fiction');
insert into genres (name) values ('fantasy');
insert into genres (name) values ('romance');
insert into genres (name) values ('thriller');
insert into genres (name) values ('mystery');
insert into genres (name) values ('horror');
insert into genres (name) values ('historical fiction');
insert into genres (name) values ('contemporary fiction');

insert into books (title, publication_year, genre_id) values ('There Are Rivers in the Sky', 2024, (select id from genres where name = 'historical fiction'));
insert into books (title, publication_year, genre_id) values ('TK1', 2012, (select id from genres where name = 'historical fiction'));
insert into books (title, publication_year, genre_id) values ('TK2', 2013, (select id from genres where name = 'science fiction'));
insert into books (title, publication_year, genre_id) values ('TK3', 2016, (select id from genres where name = 'science fiction'));
insert into books (title, publication_year, genre_id) values ('TK4', 2016, (select id from genres where name = 'science fiction'));
insert into books (title, publication_year, genre_id) values ('TK5', 2016, (select id from genres where name = 'science fiction'));
insert into books (title, publication_year, genre_id) values ('TK6', 2006, (select id from genres where name = 'science fiction'));

insert into authors_books (author_id, book_id) values (1, 1);
insert into authors_books (author_id, book_id) values (1, 2);
insert into authors_books (author_id, book_id) values (1, 3);
insert into authors_books (author_id, book_id) values (2, 4);
insert into authors_books (author_id, book_id) values (2, 5);
insert into authors_books (author_id, book_id) values (2, 6);
insert into authors_books (author_id, book_id) values (3, 7);