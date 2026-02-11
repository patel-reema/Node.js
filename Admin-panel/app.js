const dbConnect = require('./config/dbConnect.js')
const express = require('express');
const app = express();

dbConnect();

app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.use('/', require('./routes/index.routes.js'))

app.listen(8010, () => {
    console.log(`Server start at http://localhost:8010`);
});