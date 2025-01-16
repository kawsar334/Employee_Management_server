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

// getEmplyee list for hr page 

const getEmployeeList = async (req, res) => { 
    try {
        const users = await User.find({ role: "employee" }).sort({createdAt: -1});
        res.status(200).json(SuccessResponse(200, "Employee List fetched successfully", users));
    } catch (err) {
        console.log(err);
        return res.status(400).json(ErrorResponse(400, "Error fetching employees"));
    }
};


// toggle verify status 
const IsVerifyEmploee = async(req, res,)=>{
    try{
        const userId = req.params.userId;
        const user = await User.findByIdAndUpdate(
            userId,
            { isVerified:true },
            { new: true } 
        );
    
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }
       return res.status(200).json(SuccessResponse(200, "Employee verification status updated successfully", user));
    }catch(err){
        // console.log(err);
        return res.status(400).json(ErrorResponse(400, "Error verifying employee"));
    }
}


// user info for hr page 

const userSlug = async (req, res) => {
    try {
        const  slug  = req.params.slug;
        const employee = await User.findById(slug);   

        if (!employee) {
            
            return res.status(404).json({ message: 'Employee not found' });
        }

        const salaryData = employee.salaryHistory; 

        res.json({
            employee: {
                name: employee.name,
                photoURL: employee.photoURL, // Assuming the field is photoURL
                designation: employee.designation,
            },
            salaryData, // Salary history data for the chart
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
}

// admin page employee list 
const admindashboardUsers = async (req, res) => {
    try {
        const employees = await User.find({ isVerified: true });
        res.json({ employees });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
}

// fired by admin 

const firedByAdmin = async(req, res,next)=>{
    try{
        const userId = req.params.userId;
        const user = await User.findByIdAndUpdate(
            userId,
            { isFired: true },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
       return res.status(200).json(SuccessResponse(200, "Employee fired successfully", user));

    }catch(err){
      
        return res.status(400).json(ErrorResponse(400, "Error fired employee"));
    }
}

const unfiredByAdmin = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findByIdAndUpdate(
            userId,
            { isFired: false },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        return res.status(200).json(SuccessResponse(200, "Employee fired successfully", user));

    } catch (err) {

        return res.status(400).json(ErrorResponse(400, "Error fired employee"));
    }
}

// make  hr by admin 
const makeHrByAdmin = async(req, res)=>{
    try{
        const userId = req.params.userId;
        const user = await User.findByIdAndUpdate(
            userId,
            { role: "hr" },
            { new: true }
        );
        return res.status(200).json(SuccessResponse(200, "Employee promoted to HR", user));
    
    }catch(err){
        console.log(err)
    }
}


// updated salary by admin

// const updatesalaryByAdmin = async (req, res) => {
//     const { salary } = req.body;
//     try {
//         const userId = await User.findById(req.params.userId);
//         const updatedSlary = await User.findByIdAndUpdate({
//             userId,
//             salary,
//             $push: { salaryHistory: { salary, date: new Date() } },
//         })
//         if (updatedSlary) {
           
//             // res.json({ message: "Salary updated successfully" });
//             return res.status(200).json(SuccessResponse(200, "salary updated successfully", updatedSlary));
//         } else {
//             res.status(404).json({ message: "Employee not found" });
//         }
//     } catch (err) {
//         res.status(500).json({ message: "Server error", error: err });
//     }
// }

const updatesalaryByAdmin = async (req, res) => {
    const { salary } = req.body;

    try {
        if (!salary || isNaN(salary)) {
            return res.status(400).json({ message: "Invalid salary input" });
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                salary,
                $push: { salaryHistory: { salary, date: new Date() } },
            },
            { new: true } 
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Employee not found" });
        }

        return res
            .status(200)
            .json(SuccessResponse(200, "Salary updated successfully", updatedUser));
    } catch (err) {
        // Handle server errors
        console.error("Error updating salary:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

 

module.exports = { 
    updateUser,
    deleteUser,
    getSingleUser,
    getAllUsers,
    getUserStats,
    updateProfilePicture,
    getEmployeeList,
    IsVerifyEmploee,
    userSlug,
    admindashboardUsers,
    firedByAdmin,
    makeHrByAdmin,
    updatesalaryByAdmin,
    unfiredByAdmin,
};
