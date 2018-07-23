-- Create our tables and define columns 
CREATE TABLE "categories" (
	"id" SERIAL PRIMARY KEY,
	"category" VARCHAR(40)
);

CREATE TABLE "books" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR(120) NOT NULL,
	"author" VARCHAR(40) NOT NULL,
	"category_id" INT REFERENCES "categories",
	"image_path" VARCHAR(255),
	"read" BOOLEAN DEFAULT false,
	"date_completed" DATE DEFAULT NULL
);

-- Here are some initial categories you can use to get your database started
INSERT INTO "categories" ("category") VALUES 
('History'),
('Science'),
('Sports'),
('Mystery'),
('Sci-Fi'),
('Drama'),
('Biography')

-- Here are some initial books you can insert for testing.
-- Note that these are meant to work only with the categories listed above.
INSERT INTO "books" ("title", "author", "category_id", "image_path") VALUES 
('Open', 'Andre Agassi', 3, '../assets/open.jpg'),
('The Godfather', 'Mario Puzo', 6, '../assets/the-godfather.jpg'),
('Master of the Senate', 'Robert Caro', 7, '../assets/master-of-the-senate.jpg'),
('Lonesome Dove', 'Larry McMurty', 6, '../assets/lonesome-dove.jpg'),
('Anathem', 'Neal Stephenson', 5, '../assets/anathem.jpg');