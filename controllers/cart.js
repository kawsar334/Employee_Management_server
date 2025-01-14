// const Cart = require('./models/cart'); // Import the Cart model
// const { ErrorResponse, SuccessResponse } = require("../middleware/customMessage")

// // Example: Adding a product to the cart
// const addToCart = async (req, res,) => {

//     const productId = req.params.productId
//     const userId = req.body;
//     const quantity= req.body
//     try {
//         const cart = await Cart.findOneAndUpdate(
//             { userId },
//             { $push: { products: { productId, quantity } }, $set: { updatedAt: Date.now() } }, 
//             { new: true, upsert: true } 
//         );
//         console.log('Cart updated:', cart);
//     } catch (error) {
//         console.error('Error adding to cart:', error);
//     }
// };


// // addToCart('userIdHere', 'productIdHere', 2);


// module.exports = {
//     addToCart
// }


const Cart = require('../models/Cart'); 
const { ErrorResponse, SuccessResponse } = require("../middleware/customMessage");

// CREATE: Add a product to the cart
const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        const cart = await Cart.findOneAndUpdate(
            { userId },
            { $push: { products: { productId, quantity } }, $set: { updatedAt: Date.now() } },
            { new: true, upsert: true } 
        );

        res.status(200).json(new SuccessResponse('Product added to cart successfully', cart));
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json(new ErrorResponse('Error adding product to cart'));
    }
};

// READ: Get cart for a user
const getCart = async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ userId }).populate('products.productId');

        if (!cart) {
            return res.status(404).json(new ErrorResponse('Cart not found'));
        }

        res.status(200).json(new SuccessResponse('Cart retrieved successfully', cart));
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json(new ErrorResponse('Error fetching cart'));
    }
};

// UPDATE: Update quantity of a product in the cart
const updateCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        const cart = await Cart.findOneAndUpdate(
            { userId, 'products.productId': productId },
            { $set: { 'products.$.quantity': quantity, updatedAt: Date.now() } },
            { new: true }
        );

        if (!cart) {
            return res.status(404).json(new ErrorResponse('Cart or product not found'));
        }

        res.status(200).json(new SuccessResponse('Cart updated successfully', cart));
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json(new ErrorResponse('Error updating cart'));
    }
};

// DELETE: Remove a product from the cart
const removeFromCart = async (req, res) => {
    const { userId, productId } = req.params;
    try {
        const cart = await Cart.findOneAndUpdate(
            { userId },
            { $pull: { products: { productId } }, $set: { updatedAt: Date.now() } },
            { new: true }
        );

        if (!cart) {
            return res.status(404).json(new ErrorResponse('Cart or product not found'));
        }

        res.status(200).json(new SuccessResponse('Product removed from cart', cart));
    } catch (error) {
        console.error('Error removing product from cart:', error);
        res.status(500).json(new ErrorResponse('Error removing product from cart'));
    }
};

// DELETE: Clear the entire cart (Remove all products)
const clearCart = async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOneAndUpdate(
            { userId },
            { $set: { products: [], updatedAt: Date.now() } },
            { new: true }
        );

        if (!cart) {
            return res.status(404).json(new ErrorResponse('Cart not found'));
        }

        res.status(200).json(new SuccessResponse('Cart cleared successfully', cart));
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json(new ErrorResponse('Error clearing cart'));
    }
};

module.exports = {
    addToCart,
    getCart,
    updateCart,
    removeFromCart,
    clearCart
};

