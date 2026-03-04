const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect('mongodb+srv://reema:r5127@cluster0.hkzvwek.mongodb.net/PR-6Blog')
        .then(() => console.log("DB is connected"))
        .catch((err) => console.log(err));
}

module.exports = dbConnect;