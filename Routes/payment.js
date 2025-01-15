const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const { createPay, payment } = require('../controllers/payment');
const { authenticateJWT } = require('../middleware/jwt');



router.post("/createpay/:id", authenticateJWT, createPay)
router.get("/payment-history",authenticateJWT, payment)


 
// router.get('/payment-history', authenticate, async (req, res) => {
//     try {
//         const { page = 1, limit = 5 } = req.query; // Default values for pagination
//         const employeeId = req.user.id; // Retrieved from authentication middleware

//         // Fetch and sort payments
//         const payments = await Payment.find({ employeeId })
//             .sort({ year: 1, month: 1 }) // Sort by year, then month
//             .skip((page - 1) * limit)
//             .limit(parseInt(limit));

//         const totalPayments = await Payment.countDocuments({ employeeId });

//         res.json({
//             payments,
//             totalPages: Math.ceil(totalPayments / limit),
//             currentPage: parseInt(page),
//         });
//     } catch (error) {
//         res.status(500).json({ error: 'Server error' });
//     }
// });

module.exports = router;
