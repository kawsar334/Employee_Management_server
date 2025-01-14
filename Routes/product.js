
const express = require("express");
const { createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct } = require("../controllers/product");

const route = express.Router();



// create a new product 
route.post("/createproduct", createProduct);
// update product by Id
route.put("/:id", updateProduct);
// delete product 
route.delete("/:id", deleteProduct);
// get product by Id 
route.get("/find/:id", getProductById);
// get product list 
route.get("/productList", getAllProducts);







module.exports = route;