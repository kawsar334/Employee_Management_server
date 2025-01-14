

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        // unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"]
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    photoURL: {
        type: String,
        default: "https://via.placeholder.com/150"
    },

   
},{timestamps:true});

module.exports = mongoose.model("User", userSchema);
