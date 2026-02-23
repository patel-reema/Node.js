const dbConnect = require('./config/dbConnect.js')
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

dbConnect();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(express.static('public'));

app.use('/uploads', express.static('uploads'));

app.use('/', require('./routes/index.routes.js'));

app.listen(8010, () => {
    console.log(`Server start at http://localhost:8010`);
});