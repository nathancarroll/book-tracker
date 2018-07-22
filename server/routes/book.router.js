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

router.put('/:id/:editFlag', (req, res) => {
    console.log('book PUT route', req.params);
    let completed;
    if (req.params.editFlag === 'edit'){
        const book = req.body;
        pool.query(`UPDATE "books" SET "title" = $1, "author" = $2, "category_id" = $3, "image_path" = $4 
                    WHERE "id" = $5;`, [book.title, book.author, book.category_id, book.image_path, req.params.id])
        .then((PGres) => {
            console.log(PGres);
            res.sendStatus(200);
            return;
        })
        .catch((err) => {
            console.log('error during book PUT', err);
            res.sendStatus(500);
            return;
        })
    } else if (req.params.editFlag === 'true'){
        completed = "NULL";
    } else if (req.params.editFlag === 'false'){
        completed = "NOW()"
    } else {
        res.sendStatus(500);
        return;
    }
    pool.query(`UPDATE "books" SET "date_completed" = ${completed} WHERE "id" = $1`, [req.params.id])
    .then((PGres) => {
        console.log(PGres);
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log('error during complete PUT', err);
        res.sendStatus(500);
    })
})


// app.put('/complete/:id/:toggle', (req, res) => {
//     console.log('complete PUT route', req.params);
//     let myVal;
//     // apparently body parser will convert your booleans to strings along the way.
//     // took me way way too long to figure that out. body parser sucks, once again.
//     if (req.params.toggle === 'true'){
//         myVal = "NULL"
//     } else {
//         myVal = "NOW()"
//     }
//     console.log(myVal);

// })
module.exports = router;