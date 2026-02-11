const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect('mongodb://localhost:27017/PR-5Movie')
        .then(() => console.log("DB is connected"))
        .catch((err) => console.log(err));
};

module.exports = dbConnect;