const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const BookRouter = require('./routes/book.router.js');
const CategoryRouter = require('./routes/category.router.js')

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/book', BookRouter);
app.use('/category', CategoryRouter);

app.use(express.static('server/public'));
app.listen(PORT, () => {
    console.log('listening on port', PORT);
})