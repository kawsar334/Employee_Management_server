const mongoose = require('mongoose');

// Cart schema definition
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',  
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now  
    },
    updatedAt: {
        type: Date,
        default: Date.now  
    }
}, { timestamps: true });  

// Cart model export
module.exports = mongoose.model('Cart', cartSchema);
