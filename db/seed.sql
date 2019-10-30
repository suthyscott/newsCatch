CREATE TABLE users(
user_id SERIAL PRIMARY KEY,
email VARCHAR(100), 
first_name VARCHAR(30), 
last_name VARCHAR(30), 
password VARCHAR(300)
);

CREATE TABLE articles(
article_id SERIAL PRIMARY KEY, 
source VARCHAR(50), 
author VARCHAR(50), 
title VARCHAR(200), 
description VARCHAR(500), 
url VARCHAR(300), 
url_to_image VARCHAR(1000), 
content TEXT, 
user_id INTEGER REFERENCES users(user_id)
);