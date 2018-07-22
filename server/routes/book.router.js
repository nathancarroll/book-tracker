const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// ROUTES FOR /BOOK
router.get('/', (req, res) => {
    console.log('book GET route');
    pool.query(`SELECT "books"."id", "title", "author", "image_path", "read", "date_completed", "category", "category_id" 
                FROM "books" JOIN "categories" ON "categories".id = "books".category_id
                ORDER BY "books".id;`)
    .then((PGres) => {
        console.log(PGres);
        res.send(PGres.rows)
    })
    .catch((err) => {
        console.log('error during GET query', err);
        res.sendStatus(500);
    })
})

router.post('/', (req, res) => {
    console.log('book POST route', req.body);
    const book = req.body;
    pool.query(`INSERT INTO "books" ("title", "author", "category_id", "image_path")
                VALUES ($1, $2, $3, $4);`, [book.title, book.author, book.category_id, book.image_path])
    .then((PGres) => {
        console.log(PGres);
        res.sendStatus(200)
    })
    .catch((err) => {
        console.log('error during book POST', err);
        res.sendStatus(500);
    })
})

router.delete('/:id', (req, res) => {
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

router.put('/:id', (req, res) => {
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

module.exports = router;