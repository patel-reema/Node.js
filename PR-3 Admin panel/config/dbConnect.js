const mongoose = requires('mongoose');


const dbConnect = () => {
    mongoose.connect('mongodb://localhost:27017/Books')
        .then(() => console.log("DB is connected"))
        .catch((err) => console.log(err));
};

module.exports = dbConnect;
