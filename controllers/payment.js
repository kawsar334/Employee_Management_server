const Payment = require("../models/Payment");
const user = require("../models/user");



const createPay =async(req,res,)=>{
    try{

        const employee = await user.findById(req.params.id);

        const newPay = new Payment({

            employeeId:req.params.id,
            name: employee.name ,
            transactionId: employee.bankAccountNo ||"Not found",
            ...req.body,
        });

        const pay = await newPay.save();
        
        res.status(201).json(pay);

    }catch(err){
        console.log(err);
    } 
}



 const payment = async (req, res) => {
    try {
        const { page = 1, limit = 5 } = req.query; 
        const employeeId = req.user.id; 

        const payment = await Payment.find()
        // const payments = await Payment.find({ employeeId })
            .sort({ year: 1, month: 1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        const totalPayments = await Payment.countDocuments({ employeeId });
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
        console.log(err);
    }
}

// for hr , user details salary, 

const getEmployeeDetails = async (req, res) => {
    try {
        // const totalSalary = payments.reduce((acc, curr) => acc + curr.salary, 0);
        const employeeId = req.params.id;
        const employee = await user.findById(employeeId);
        const payments = await Payment.find({ employeeId });

        // const totalSalary = payments.reduce((acc, curr) => acc + curr.salary, 0);

        res.json({
            employee,
           pay: payments,
            // totalSalary
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};  


// payment history  of user----------this is for user 

const getPaymentHistory = async (req, res) => {
    try {
        const employeeId = req.user.id;
        const payments = await Payment.find({ employeeId: req.user.id });
        res.json({
            message:"payment information fetch succefully ",
            payments
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' });
    }
};


module.exports = { payment, createPay, updatestatusOfPayment, getEmployeeDetails, getPaymentHistory }