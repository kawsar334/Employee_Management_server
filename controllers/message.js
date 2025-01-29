const Message = require("../models/message")
const { ErrorResponse, SuccessResponse } = require("../middleware/customMessage");
const User = require("../models/user");
const user = require("../models/user");



// create message----------------------------
const createMessage = async (req, res) => {
    try {
        const { email, message } = req.body;
        const newMessage = new Message({ email, message });
     
        const savemessage=  await newMessage.save();
        await User.updateMany({
            role: "admin",
        },
            { $push: { message: savemessage } }
        )
        await User.updateMany({
            role: "hr",
        },
            { $push: { message: savemessage } }
        )
  
        res.status(201).json({ message: 'Message sent', newMessage });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


// Get all messages in admin panelllll------------------------------
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

