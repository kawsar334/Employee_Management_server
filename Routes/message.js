



const express = require("express");
const {
    createMessage,
    getAllMessage
} = require("../controllers/message");
const { authenticateAdmin } = require("../middleware/jwt");
;
const router = express.Router();



// create a mesasge 
router.post('/send',createMessage);

// get all message 
router.get('/messages',authenticateAdmin,getAllMessage);



module.exports = router;