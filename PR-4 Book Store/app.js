const express = require('express');
const app = express();
const port = 8080;

const dbConnect = require('./config/dbConnect');
dbConnect();

app.set('view engine', 'ejs');
app.use(express.urlencoded());

app.use('/uploads', express.static('uploads'));
app.use('/', require('./routes/book.routes'));

app.listen(port, () => {
    console.log(`Server starting at http://localhost:${port}`)
});