
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true, min: 0.01 },
    quantityAvailable: { type: Number, required: true, min: 1 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    subcategory: String,
    discount: { type: Number, min: 0, max: 100, default: 0 }, 
    promotionEndDate: { type: Date } 
});

productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.methods.getDiscountedPrice = function() {
    const today = new Date();
    if (this.discount > 0 && this.promotionEndDate && this.promotionEndDate > today) {
        return this.price * (1 - this.discount / 100); 
    }
    return this.price; 
};

module.exports = mongoose.model('Product', productSchema);
