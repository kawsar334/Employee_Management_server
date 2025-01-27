

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String

    },
    role: {
        type: String,
        enum: ['employee', 'hr', 'admin'],
         required: true

    },
    bankAccountNo: {
        type: String,
        // required: true,
        default:""

    },
    salary: {
        type: Number,
        default: 0

    },
    designation: {
        type: String

    },
    isFired:{
        type: Boolean,
        default: false
    },
    photoURL: {
        type: String

    },
    isVerified: {
        type: Boolean,
        default: false

    },
    createdAt: {
        type: Date,
        default: Date.now
 
    },
    message:{
        type:Array ,
        default: [],
    }


}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
