

const express = require("express");;
const router = express.Router();
const {
    updateUser,
    deleteUser,
    getSingleUser,
    getAllUsers,
    getUserStats,
    updateProfilePicture
} = require("../controllers/user");
const { authenticateJWT, authenticateAdmin } = require("../middleware/jwt");

// Route to update a user by ID
router.put("/update/:id", updateUser);

// Route to delete a user by ID
router.delete("/:id", deleteUser);

// Route to get a single user by ID
router.get("/find/:id", getSingleUser);

// Route to get all users
router.get("/userList", authenticateJWT, getAllUsers);

// Route to get user stats
router.get("/stats", getUserStats);

// updateProfilePicture
router.put("/updatedprofilepic/:userId", updateProfilePicture);
module.exports = router;