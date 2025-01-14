// controllers/userController.js

const User = require("../models/user");
const { SuccessResponse, ErrorResponse } = require("../middleware/customMessage");

// Update user
const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const updates = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, updates, {
            new: true,
            runValidators: true
        });
        if (!updatedUser) {
            return res.status(404).json(ErrorResponse(404, "User not found"));
        }

        return res.status(200).json(SuccessResponse(200, "User updated successfully", updatedUser));
    } catch (err) {
        console.log(err);
        return res.status(400).json(ErrorResponse(400, "Error updating user"));
    }
};

// Delete user
const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json(ErrorResponse(404, "User not found"));
        }

        return res.status(200).json(SuccessResponse(200, "User deleted successfully", deletedUser));
    } catch (err) {
        console.log(err);
        return res.status(400).json(ErrorResponse(400, "Error deleting user"));
    }
};

// Get single user by ID
const getSingleUser = async (req, res, next) => {
    
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json(ErrorResponse(404, "User not found"));
        }
        return res.status(200).json(SuccessResponse(200, "User fetched successfully", user));
    } catch (err) {
        console.log(err);
        return res.status(400).json(ErrorResponse(400, "Error fetching user"));
    }
};

// Get all users
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json(SuccessResponse(200, "Users fetched successfully", users));
    } catch (err) {
        console.log(err);
        return res.status(400).json(ErrorResponse(400, "Error fetching users"));
    }
};

// Get user stats (e.g., total number of users, etc.)
const getUserStats = async (req, res, next) => {
    try {
        const totalUsers = await User.countDocuments();
        const usersByRole = await User.aggregate([
            {
                $group: {
                    _id: "$role",
                    count: { $sum: 1 }
                }
            }
        ]);

        const stats = {
            totalUsers,
            usersByRole
        };

        return res.status(200).json(SuccessResponse(200, "User stats fetched successfully", stats ));
    } catch (err) {
        console.log(err);
        return res.status(400).json(ErrorResponse(400, err));
    }
}; 



const updateProfilePicture = async (req, res) => {
    try {
        const {  photoURL } = req.body;
        const userId = req.params.userId

        if ( !photoURL) {
            return res.status(400).send("User ID and profile picture URL are required.");
        }
        console.log(userId)
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            { photoURL: photoURL },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send("User not found.");
        }

        res.status(200).send({
            message: "Profile picture updated successfully.",
            photoURL: updatedUser.photoURL,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error.");
    }
}

// signin with jwt 




module.exports = {
    updateUser,
    deleteUser,
    getSingleUser,
    getAllUsers,
    getUserStats,
    updateProfilePicture,
};
