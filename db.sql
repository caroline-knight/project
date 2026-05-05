drop database if exists my_first_db;

create database my_first_db;

\c my_first_db

CREATE TABLE "users" (
  "id" serial primary key,
  "email" text,
  "name" text,
  "password" text,
  "salt" text
);

CREATE TABLE "genres" (
  "id" serial primary key,
  "name" text
);

CREATE TABLE "books" (
  "id" serial primary key,
  "title" text,
  "publication_year" int,
  "genre_id" int
);

CREATE TABLE "authors" (
  "id" serial primary key,
  "first_name" text,
  "last_name" text
);

CREATE TABLE "authors_books" (
  "id" serial primary key,
  "book_id" int,
  "author_id" int
);

CREATE TABLE "books_users" (
  "id" serial primary key,
  "book_id" int,
  "user_id" int,
  "read_status" text
);

CREATE TABLE "comments" (
  "id" serial primary key,
  "user_id" int,
  "book_id" int,
  "comment" text,
  "created_at" timestamp
);