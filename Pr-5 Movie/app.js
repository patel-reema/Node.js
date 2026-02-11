const express = require('express');
const app = express();
const port = 8020;

const dbConnect = require('./config/dbConnect');
dbConnect();

app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use('/', require('./routes/movie.routes'));

app.listen(port, () => {
    console.log(`Server starting at http://localhost:${port}`)
});