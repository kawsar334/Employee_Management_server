
const express = require("express");
const route = express.Router();
const { creatework,
    getAllworks,
    getworkById,
    updatework,
    deletework } = require("../controllers/work");
const { authenticateJWT } = require("../middleware/jwt");

// create a new work 
route.post("/creatework", authenticateJWT, creatework);
// update work by Id
route.put("/:id", authenticateJWT, updatework);
// delete work 
route.delete("/:id", authenticateJWT, deletework);
// get work by Id 
route.get("/find/:id", authenticateJWT, getworkById);
// get work list 
route.get("/workList", authenticateJWT, getAllworks);







module.exports = route;