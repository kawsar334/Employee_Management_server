

const express = require("express");;
const router = express.Router();
const {
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
    unfiredByAdmin,
    makeHrByAdmin,
    updatesalaryByAdmin,

} = require("../controllers/user");
const { authenticateJWT, authenticateAdmin } = require("../middleware/jwt");

// Route to update a user by ID
router.put("/update/:id", authenticateJWT, updateUser);

// Route to delete a user by ID
router.delete("/:id", authenticateJWT, deleteUser);

// Route to get a single user by ID
router.get("/find/", authenticateJWT, getSingleUser);

// Route to get all users
router.get("/userList", authenticateJWT, getAllUsers);

// Route to get user stats
router.get("/stats", authenticateJWT, getUserStats);

// updateProfilePicture
router.put("/updatedprofilepic/:userId", updateProfilePicture);
router.get("/employeelist", getEmployeeList);
router.put("/verifiyemployee/:userId", IsVerifyEmploee);

// userSlug /user details
router.get('/details/:slug', userSlug );
// all employee for admin dashboard
router.get('/all-employee-list', authenticateAdmin, admindashboardUsers, );
router.put("/fired/:userId", authenticateAdmin, firedByAdmin)
// unfired by admin
router.put("/unfired/:userId", unfiredByAdmin)
// make hr  byAdmin
router.put("/make-hr/:userId", authenticateAdmin, makeHrByAdmin)
// adjust-salary
router.put('/adjust-salary/:userId', authenticateAdmin, updatesalaryByAdmin)
// get employee for hr progrees 
router.get('/api/employees', (req, res) => {
    res.json(employees);
});

module.exports = router;