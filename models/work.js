const mongoose = require("mongoose");

const workSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
         required: true,
    },
    task: {
        type: String,
        required: true

    },
    hoursWorked: {
        type: Number,
        required: true

    },
    date: {
        type: Date,
        default: Date.now

    },
},{timestamps:true});


module.exports = mongoose.model("Work", workSchema);
