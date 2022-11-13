const mongoose = require('mongoose');


const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
    created_at: Date,
    updated_at: Date
})

module.exports = User;