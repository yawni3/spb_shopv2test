const mongoose = reqire('mongoose');

const orderSchema = new mongoose.Schema({
    costumerEmail: { type:String, required: true},
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    productNme: { type: String},
    price: { type: Number},
    downloadSent: { type: Boolean, default: false},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);