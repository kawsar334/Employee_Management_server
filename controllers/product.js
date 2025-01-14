
const { ErrorResponse, SuccessResponse } = require("../middleware/customMessage")
const Product = require("../models/product");


// Create a new product
const createProduct = async (req, res, next) => {
    try {
        const newProduct = new Product({
            ...req.body,
        });
        const product = await newProduct.save();
        return res.status(201).json(SuccessResponse(201, "Product created successfully", product));
    } catch (err) {
        console.log(err);
        return res.status(400).json(ErrorResponse(400, "Error creating product"));
    }
};

// Get all products
const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        return res.status(200).json(SuccessResponse(200, "Products fetched successfully", products));
    } catch (err) {
        console.log(err);
        return res.status(400).json(ErrorResponse(400, "Error fetching products"));
    }
};

// Get a single product by ID
const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json(ErrorResponse(404, "Product not found"));
        }

        return res.status(200).json(SuccessResponse(200, "Product fetched successfully", product));
    } catch (err) {
        console.log(err);
        return res.status(400).json(ErrorResponse(400, "Error fetching product"));
    }
};

// Update product by ID
const updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedProduct) {
            return res.status(404).json(ErrorResponse(404, "Product not found"));
        }

        return res.status(200).json(SuccessResponse(200, "Product updated successfully", updatedProduct));
    } catch (err) {
        console.log(err);
        return res.status(400).json(ErrorResponse(400, "Error updating product"));
    }
};

// Delete product by ID
const deleteProduct = async (req, res, next) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json(ErrorResponse(404, "Product not found"));
        }

        return res.status(200).json(SuccessResponse(200, "Product deleted successfully", deletedProduct));
    } catch (err) {
        console.log(err);
        return res.status(400).json(ErrorResponse(400, "Error deleting product"));
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};



