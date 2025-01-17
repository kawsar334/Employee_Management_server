const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const { createPay, payment, updatestatusOfPayment, getEmployeeDetails, getPaymentHistory } = require('../controllers/payment');
const { authenticateJWT, authenticateAdmin } = require('../middleware/jwt');




// for hr
router.post("/createpay/:id", authenticateJWT, createPay);
// for addmin page
router.get("/payment-history",authenticateJWT, payment);
//  updatestatusOfPayment
router.put("/updatestatusOfPayment/:id", authenticateAdmin, updatestatusOfPayment);

// getEmployeeDetails for hr /this is can see only hr
router.get("/getEmployeeDetails/:id", authenticateJWT, getEmployeeDetails);

// getPaymentHistory of user for employee dashboard 
router.get("/getPaymentHistory", authenticateJWT, getPaymentHistory);

module.exports = router;
