

const express = require("express");
const {
    addToCart,
    getCart,
    updateCart,
    removeFromCart,
    clearCart
} = require("../controllers/cart");
;
const router = express.Router();


// addToCart,

router.post("/addtocart", addToCart)
//     getCart,
//     updateCart,


//     removeFromCart,
//     clearCart




module.exports = router;