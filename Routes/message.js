



const express = require("express");
const {
    createMessage,
    getAllMessage
} = require("../controllers/message");
;
const router = express.Router();



// create a mesasge 
router.post('/messages',createMessage);

// get all message 
router.get('/messages',getAllMessage);



module.exports = router;