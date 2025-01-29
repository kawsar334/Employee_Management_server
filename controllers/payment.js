const Payment = require("../models/Payment");
const user = require("../models/user");



const createPay =async(req,res,)=>{
    try{
        // enshure hr ===========
        if (req.user.role==="hr") {const employee = await user.findById(req.params.id);

        const newPay = new Payment({

            employeeId:req.params.id,
            name: employee.name ,
            transactionId: employee.bankAccountNo ||"Not found",
            ...req.body,
        });

        const pay = await newPay.save();
          
        res.status(201).json(pay);}
        else{
            return res.status(403).json({msg: "Access denied, Only HR can create payment."});
        }

    }catch(err){
    

        return res.status(400).json(err)
    } 
}


// payment  for admin 
 const payment = async (req, res) => {
    try {
        const { page = 1, limit = 5 } = req.query; 
        const employeeId = req.user.id; 
        // const payments = await Payment.find({ employeeId })
        const payment = await Payment.find().sort({createdAt: -1})
            .sort({ year: 1, month: 1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        const totalPayments = await Payment.countDocuments();

        res.json({
    
            totalPages: Math.ceil(totalPayments / limit),
            currentPage: parseInt(page),
            payment
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// convert status panding in to paid by admin 
const updatestatusOfPayment= async(req, res)=>{
    try{
        const updateEmployeeId = await Payment.findByIdAndUpdate(req.params.id, {
            status: 'Paid'
        },
        { new: true }
    );

    if(!updateEmployeeId){
        return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json({
        message: 'salary paid successfully',
        payment: updateEmployeeId
    });
    }catch(err){
        res.status(500).json({ error: 'Server error' });
     
    }
}

// for hr , user details salary,-------------- 

const getEmployeeDetails = async (req, res) => {
    try {
        // enshure hr ===========
        if(req.user.role=== "hr"){const employeeId = req.params.id;
        const employee = await user.findById(employeeId);
        const payments = await Payment.find({ employeeId });
        res.json({
            employee,
           pay: payments,
        });}else{
            return res.status(403).json({msg: "Access denied, Only HR can get employee details."});
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};  


// payment history  of user----------this is for user 
const getPaymentHistory = async (req, res) => {
    try {
        const { page = 1, limit = 5 } = req.query;
        const totalPayments = await Payment.countDocuments({ employeeId: req.user.id });
        const payments = await Payment.find({ employeeId: req.user.id })
            .sort({ createdAt: 1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));
        res.json({
            message:"payment information fetch succefully ",
            payments,
            currentPage: Number(page),
            totalPages: Math.ceil(totalPayments / limit),
        });
    } catch (error) {
       
        res.status(500).json({ error: 'Server error' });
    }
};


module.exports = { payment, createPay, updatestatusOfPayment, getEmployeeDetails, getPaymentHistory }