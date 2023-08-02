"use strict";
const { model, Schema } = require('mongoose');
const bookSchema = new Schema({
    name: String,
    author: String,
    price: Number,
    createAt: String,
});
module.exports = model('Book', bookSchema);
