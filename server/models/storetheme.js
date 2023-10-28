const mongoose = require("mongoose");

const { Schema } = mongoose;

const storethemeSchema = new Schema({
    'store_name': { type: String },
    'business_name': { type: String },
    'color': { type: String },
    'theme': { type: String },
    'fonts': { type: String },
    'createdAt': { type: Date, default: Date.now },
    'updatedAt': { type: Date, default: Date.now }
});

module.exports = mongoose.model('store_themes', storethemeSchema); 