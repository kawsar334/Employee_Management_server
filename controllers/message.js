const Message = require("../models/message")
const { ErrorResponse, SuccessResponse } = require("../middleware/customMessage");
const User = require("../models/user");



// create message
const createMessage = async (req, res) => {
    try {
        const { email, message } = req.body;
        const newMessage = new Message({ email, message });
        // const users = await User.find({rold:"admin"});
              // const admins = await User.find({ role: "admin" });
        
        // // Push the new message into each admin's messages array
        // const updatePromises = admins.map(admin => {
        //     admin.messages.push({
        //         _id: newMessage._id,
        //         email: newMessage.email,
        //         message: newMessage.message,
        //         createdAt: newMessage.createdAt,
        //         updatedAt: newMessage.updatedAt,
        //     });
        //     return admin.save(); // Save the updated admin document
        // });
        await newMessage.save();
        res.status(201).json({ message: 'Message sent', newMessage });
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

