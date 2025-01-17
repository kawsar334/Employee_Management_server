
const express = require("express");
const route = express.Router();
const { creatework,
    getAllworks,
    getworkById,
    updatework,
    deletework, getworksOfAllEmployee } = require("../controllers/work");
const { authenticateJWT } = require("../middleware/jwt");
const user = require("../models/user");
const work = require("../models/work");
const Payment = require("../models/Payment");

// create a new work  with authenticated employee
route.post("/creatework", authenticateJWT, creatework);
// update work by Id
route.put("/:id", authenticateJWT, updatework);
// delete work 
route.delete("/:id", authenticateJWT, deletework);
// get work by Id 
route.get("/find/:id", authenticateJWT, getworkById);
// get work list 
route.get("/workList", authenticateJWT, getAllworks);


route.get('/work-records', getworksOfAllEmployee);





module.exports = route;