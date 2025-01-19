

const express = require('express');
const createStripe = require('../controllers/stripe');
const { authenticateJWT } = require('../middleware/jwt');
const router = express.Router();


router.post('/create', createStripe );

module.exports = router;
