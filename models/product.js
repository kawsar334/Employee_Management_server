const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
        minlength: [3, "Product name must be at least 3 characters long"]
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        minlength: [10, "Description must be at least 10 characters long"]
    },
    price: {
        type: Number, 
        required: [true, "Product price is required"],
        min: [0, "Price cannot be negative"]
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        enum: ["Electronics", "Clothing", "Home", "Books", "Sports", "Other"], 
        default: "Other"
    },
    stock: {
        type: Number, 
        required: [true, "Stock count is required"],
        min: [0, "Stock cannot be negative"],
        default: 0
    },
    image: {
        type: String, 
        required: [true, "Product image is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export the Product model
module.exports = mongoose.model("Product", productSchema);
