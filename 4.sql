CREATE DATABASE IF NOT EXISTS dumbways;
USE dumbways;

CREATE TABLE heroes_tb (
    id int(10) NOT NULL AUTO_INCREMENT,
    name varchar(50),
    type_id varchar(50),
    PRIMARY KEY (id), 
    FOREIGN KEY (type_id) REFERENCES type_tb(id) 
);

CREATE TABLE type_tb (
  id int(10) NOT NULL AUTO_INCREMENT,
  name varchar(50),
  type_id varchar(50),
  PRIMARY KEY (id)
);

INSERT INTO authors (id, name, city) VALUES
(1, 'Michaela Lehr', 'Berlin'),
(2, 'Michael Wanyoike', 'Nairobi'),
(3, 'James Hibbard', 'Munich'),
(4, 'Karolina Gawron', 'Wrocław');


SELECT h.id,h.name,h.type_id, h.photo ,t.name
    FROM heroes_tb as h 
    JOIN type_tb as t on h.type_id = t.id
