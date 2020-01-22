\c demodb;


CREATE TABLE user_id(
   user_id serial PRIMARY KEY,
   name text NOT NULL,
   password text NOT NULL,
   email text NOT NULL,
   phone character(10)[],
   gender text,
   avatar text
);
INSERT INTO user_id (name,password,email) values ('stains','1234','aa@gmail.com');
