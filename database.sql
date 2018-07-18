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
	"image_path" VARCHAR(120),
	"pages" INTEGER,
	"read" BOOLEAN DEFAULT false,
	"date_completed" DATE DEFAULT NULL
);

-- Seed some initial categories
INSERT INTO "categories" ("category") VALUES 
('History/Non-Fiction'),
('Science/Non-Fiction'),
('Sports/Non-Fiction'),
('Mystery/Fiction'),
('Sci-Fi/Fiction'),
('Drama/Fiction');