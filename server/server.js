const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pool = require('./modules/pool.js')

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('server/public'));


// ROUTES FOR /BOOK
app.get('/book', (req, res) => {
    console.log('book GET route');
    pool.query(`SELECT "books"."id", "title", "author", "image_path", "pages", "read", "date_completed", "category", "category_id" 
                FROM "books" JOIN "categories" ON "categories".id = "books".category_id;`)
    .then((PGres) => {
        console.log(PGres);
        res.send(PGres.rows)
    })
    .catch((err) => {
        console.log('error during GET query', err);
        res.sendStatus(500);
    })
})

app.post('/book', (req, res) => {
    console.log('book POST route', req.body);
    const book = req.body;
    pool.query(`INSERT INTO "books" ("title", "author", "category_id", "image_path", "pages")
                VALUES ($1, $2, $3, $4, $5);`, [book.title, book.author, book.category_id, book.image_path, book.pages])
    .then((PGres) => {
        console.log(PGres);
        res.sendStatus(200)
    })
    .catch((err) => {
        console.log('error during book POST', err);
        res.sendStatus(500);
    })
})

app.delete('/book/:id', (req, res) => {
    console.log('book DELETE route', req.params.id);
    pool.query(`DELETE FROM "books" WHERE "id" = $1;`, [req.params.id])
    .then((PGres) => {
        // console.log(PGres);
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log('error during book DELETE', err);
        res.sendStatus(500);
    })
})

app.put('/book/:id', (req, res) => {
    console.log('book PUT route', req.params.id);
    const book = req.body;
    console.log(book);
    pool.query(`UPDATE "books" SET "title" = $1, "author" = $2, "category_id" = $3, "image_path" = $4 
                WHERE "id" = $5;`, [book.title, book.author, book.category_id, book.image_path, req.params.id])
    .then((PGres) => {
        console.log(PGres);
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log('error during book PUT', err);
        res.sendStatus(500);
    })
})

// ROUTES FOR /CATEGORY
app.get('/category', (req, res) => {
    console.log('category GET route');
    pool.query(`SELECT COUNT("books".id), "categories".category, "categories".id FROM "books" 
    RIGHT OUTER JOIN "categories" ON "categories".id = "books".category_id 
    GROUP BY "categories".id;`)
    .then((PGres) => {
        console.log(PGres);
        res.send(PGres.rows)
    })
    .catch((err) => {
        console.log('error during category GET', err);
        res.sendStatus(500);
    })
})

app.post('/category', (req, res) => {
    console.log('category POST route', req.body.data);
    pool.query(`INSERT INTO "categories" ("category") VALUES ($1);`, [req.body.data])
    .then((PGres) => {
        console.log(PGres);
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log('error during category POST', err);
        res.sendStatus(500);
    })
})

app.delete('/category/:id', (req, res) => {
    console.log('category DELETE route');
    pool.query(`DELETE FROM "categories" WHERE "id" = $1;`, [req.params.id])
    .then((PGres) => {
        console.log(PGres);
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log('error during category DELETE', err);
        res.sendStatus(500);
    })
})

app.listen(PORT, () => {
    console.log('listening on port', PORT);
})