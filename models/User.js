const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, match: /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/ },
    email: { type: String, required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    password: { type: String, required: true, minlength: 6, match: /(?=.*[!@#$%^&*])/ },
    address: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
