



const express = require("express");
const {createMessage,getAllMessage} = require("../controllers/message");
const { authenticateAdmin } = require("../middleware/jwt");
;

const router = express.Router();
// create a mesasge  /this is a public route for report in to admin 
router.post('/send',createMessage);
// get all message  get reports in admin dashboard 
router.get('/messages',authenticateAdmin ,getAllMessage);

module.exports = router;