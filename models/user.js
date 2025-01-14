

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
        enum: ['Employee', 'HR', 'Admin'], required: true

    },
    bankAccountNo: {
        type: String

    },
    salary: {
        type: Number,
        default: 0

    },
    designation: {
        type: String

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


}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
