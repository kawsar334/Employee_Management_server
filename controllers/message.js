const Message = require("../models/message")
const { ErrorResponse, SuccessResponse } = require("../middleware/customMessage");



// create message
const createMessage = async (req, res) => {
    try {
        const { email, message } = req.body;
        const newMessage = new Message({ email, message });
        await newMessage.save();
        res.status(201).json({ message: 'Message created', newMessage });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


// Get all messages
const getAllMessage = async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



module.exports = {
    createMessage,
    getAllMessage,
};

