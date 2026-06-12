const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true},
    description: {type: String},
    price: {type: Number, deafult: 0},
    isFree: { type: Boolean, default: false},
    bannerUrl: { type: String},
    thumbnailUrl: { type: String},
    previewImages: [{ type: String }],
    category: { type: String},
    fileUrl: { type: String},
    active: {type: Boolean, default: true},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);