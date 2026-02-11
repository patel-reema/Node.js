const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    ContactNo: String,
    profileimg: String
});

module.exports = mongoose.model('Admin', adminSchema);