const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true},
    description: {type: String},
    price: {type: Number, required: true},
    category: { type: String},
    fileUrl: { type: String},
    imageUrl: { type: String},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);