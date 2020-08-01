---> copy script from here 
CREATE DATABASE IF NOT EXISTS dumbways;
USE dumbways; 


CREATE TABLE type_tb (
    id int(10) NOT NULL AUTO_INCREMENT,
    name varchar(50),
    PRIMARY KEY (id)
);

CREATE TABLE heroes_tb (
    id int(10) NOT NULL AUTO_INCREMENT,
    name varchar(50),
    type_id int(10),
    photo text,
    PRIMARY KEY (id)
);


------ dump data -------------- 
INSERT INTO 
	type_tb (name) 
  VALUES
	('mage'),
    ('agility'),
    ('figther');

INSERT INTO 
	heroes_tb (name, type_id, photo)
  VALUES
	('zeus', 1, 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.dotafire.com%2Fimages%2Fsocial%2Fheroes%2Fzeus.jpg&imgrefurl=https%3A%2F%2Fwww.dotafire.com%2Fdota-2%2Fhero%2Fzeus-34&tbnid=IhHxN2MTOJ6JqM&vet=12ahUKEwjMzZaFyvnqAhWygksFHV4YBCYQMygFegUIARC3AQ..i&docid=T4k2x1sWR3dkLM&w=1040&h=520&q=zeus%20dota&safe=strict&ved=2ahUKEwjMzZaFyvnqAhWygksFHV4YBCYQMygFegUIARC3AQ'),
	('razor', 2, 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.imgur.com%2FX4eQZXQ.jpg&imgrefurl=https%3A%2F%2Fpages.firstblood.io%2Fpages%2Fblog%2Fdota-2%2Fdota-2-hero-guide-razor%2F&tbnid=5VA65cHXDc4SrM&vet=12ahUKEwi9ppuNy_nqAhXVieYKHc5gB3EQMygCegUIARCvAQ..i&docid=dbxjC0-q5Zq9hM&w=1920&h=1080&q=razor%20dota%20image&safe=strict&ved=2ahUKEwi9ppuNy_nqAhXVieYKHc5gB3EQMygCegUIARCvAQ'),
	('axe', 3, 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fggwp.id%2Fmedia%2Fwp-content%2Fuploads%2F2017%2F04%2F48-Gambar-Axe-Dota-2-Wallpaper-11-e1493177843825.jpg&imgrefurl=https%3A%2F%2Fggwp.id%2Fmedia%2Ffeatured%2Fguide-pemula-dota-2-axe&tbnid=FacuxLGKmOUTDM&vet=12ahUKEwjCnYSby_nqAhUQJLcAHeu1CDAQMygDegUIARCqAQ..i&docid=Nnk7Zfor_-gJ3M&w=800&h=450&q=axe%20dota%20image&safe=strict&ved=2ahUKEwjCnYSby_nqAhUQJLcAHeu1CDAQMygDegUIARCqAQ');


---> end 

------ Tampilkan seluruh data dari table heroes beserta type dari hero tsb --------
SELECT hero.id,hero.name,hero.type_id, hero.photo ,type.name
    FROM heroes_tb as hero 
    JOIN type_tb as type on hero.type_id = type.id

------ Tampilkan seluruh data heroes berdasarkan type tertentu --------------
SELECT hero.id,hero.name,hero.type_id, hero.photo ,type.name
    FROM heroes_tb as hero 
    JOIN type_tb as type on hero.type_id = type.id
    WHERE type.name = 'mage'


------- Tampilkan spesifik data heroes dengan type nya ------------------
SELECT hero.id,hero.name,hero.type_id, hero.photo ,type.name
    FROM heroes_tb as hero 
    JOIN type_tb as type on hero.type_id = type.id
    WHERE hero.name = 'razor'
