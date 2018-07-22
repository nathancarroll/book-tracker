const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// ROUTES FOR /CATEGORY
router.get('/', (req, res) => {
    console.log('category GET route');
    pool.query(`SELECT COUNT("books".id), "categories".category, "categories".id FROM "books" 
    RIGHT OUTER JOIN "categories" ON "categories".id = "books".category_id 
    GROUP BY "categories".id
    ORDER BY "categories".id;`)
    .then((PGres) => {
        console.log(PGres);
        res.send(PGres.rows)
    })
    .catch((err) => {
        console.log('error during category GET', err);
        res.sendStatus(500);
    })
})

router.post('/', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

module.exports = router;