const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect('mongodb://localhost:27017/admin-panel')
        .then(() => console.log("DB is connected"))
        .catch((err) => console.log(err));
}

module.exports = dbConnect;