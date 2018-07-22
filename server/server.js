const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pool = require('./modules/pool.js')

const BookRouter = require('./routes/book.router.js');

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/book', BookRouter);

app.use(express.static('server/public'));

// ROUTES FOR /CATEGORY
app.get('/category', (req, res) => {
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

app.put('/complete/:id/:toggle', (req, res) => {
    console.log('complete PUT route', req.params);
    let myVal;
    // apparently body parser will convert your booleans to strings along the way.
    // took me way way too long to figure that out. body parser sucks, once again.
    if (req.params.toggle === 'true'){
        myVal = "NULL"
    } else {
        myVal = "NOW()"
    }
    console.log(myVal);
    pool.query(`UPDATE "books" SET "date_completed" = ${myVal} WHERE "id" = $1`, [req.params.id])
    .then((PGres) => {
        console.log(PGres);
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log('error during complete PUT', err);
        res.sendStatus(500);
    })
})

app.listen(PORT, () => {
    console.log('listening on port', PORT);
})