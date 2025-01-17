
const { ErrorResponse, SuccessResponse } = require("../middleware/customMessage");
const Payment = require("../models/Payment");
const user = require("../models/user");
const Work = require("../models/work");


// Create a new work by authenticated employ
const creatework = async (req, res, next) => {
    try {
        const newwork = new Work({
            employeeId:req.user.id,
            ...req.body,
        }); 
        const work = await newwork.save();
        return res.status(201).json(SuccessResponse(201, "work created successfully", work));
    } catch (err) {
       
        return res.status(400).json(ErrorResponse(400, "Error creating work"));
    }
};


// Get all works of authenticated user
const getAllworks = async (req, res, next) => {
    const userId = req.user.id;
    try {
        const works = await Work.find({ employeeId: userId }).sort({
            createdAt: -1,
        });
        return res.status(200).json(SuccessResponse(200, "works fetched successfully", works));
    } catch (err) {
      
        return res.status(400).json(ErrorResponse(400, "Error fetching works"));
    }
};

// Get a single work by specefic ID by authenticated user
const getworkById = async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const work = await Work.findById({ _id: id, user: userId });

        if (!work) {
            return res.status(404).json(ErrorResponse(404, "work not found"));
        }

        return res.status(200).json(SuccessResponse(200, "work fetched successfully", work));
    } catch (err) {

        return res.status(400).json(ErrorResponse(400, "Error fetching work"));
    }
};

// ;


// Update work by ID
const updatework = async (req, res, next) => {
    const { id } = req.params;
    const { task, hoursWorked, date } = req.body;
    try {
        const updatedwork = await Work.findByIdAndUpdate(
            id,
            { task, hoursWorked, date },
            { new: true }
        ).sort({
            createdAt: -1, 
        });

        if (!updatedwork) {
            return res.status(404).json(ErrorResponse(404, "work not found"));
        }

        return res.status(200).json(SuccessResponse(200, "work updated successfully", updatedwork));
    } catch (err) {
       
        return res.status(400).json(ErrorResponse(400, "Error updating work"));
    }
};


// Delete work by ID
const deletework = async (req, res, next) => {
    try {
        const deletedwork = await Work.findByIdAndDelete(req.params.id);
        if (!deletedwork) {
            return res.status(404).json(ErrorResponse(404, "work not found"));
        }

        return res.status(200).json(SuccessResponse(200, "work deleted successfully", deletedwork));
    } catch (err) {
     
        return res.status(400).json(ErrorResponse(400, "Error deleting work"));
    }
};


// for hr rout
const getworksOfAllEmployee = async (req, res) => {
    try{
        const users = await user.find();
        const works = await Work.find();
        const payments = await Payment.find();
        res.json({ users, works, payments });
    }catch(err){
        return res.status(400).json(ErrorResponse(400, "Error fetching data"));
    }
}
   

module.exports = {
    creatework,
    getAllworks,
    getworkById,
    updatework,
    deletework,
    getworksOfAllEmployee,
};



