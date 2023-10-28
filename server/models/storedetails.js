const mongoose = require("mongoose");

const { Schema } = mongoose;

const storedetailsSchema = new Schema({
    'store_name': { type: String },
    'access_token': { type: String },
    'business_name': { type: String },
    'color': { type: String },
    'logo': { type: String },
    'email': { type: String },
    'fonts': { type: String },
    'product_display': { type: String },
    'payment_method': { type: String },
    'shipping_option': { type: String },
    'createdAt': { type: Date, default: Date.now },
    'updatedAt': { type: Date, default: Date.now }
});

module.exports = mongoose.model('store_details', storedetailsSchema); 