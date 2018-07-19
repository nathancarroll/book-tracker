const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pool = require('./modules/pool.js')

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(express.static('server/public'));


// ROUTES FOR /BOOK
app.get('/book', (req, res) => {
    console.log('book GET route');
    pool.query('SELECT * FROM "books";')
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
        console.log(PGres);
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log('error during book DELETE', err);
        res.sendStatus(500);
    })
})

// ROUTES FOR /CATEGORY
app.get('/category', (req, res) => {
    console.log('category GET route');
    pool.query('SELECT * FROM "categories";')
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