const Payment = require("../models/Payment");


const createPay =async(req,res,)=>{
    try{

        const newPay = new Payment({

            employeeId:req.params.id,
            ...req.body,
        });
        const pay = await newPay.save();
        console.log(pay)
        res.status(201).json(pay);

    }catch(err){
        console.log(err);
    }
}



 const payment = async (req, res) => {
    try {
        const { page = 1, limit = 5 } = req.query; 
        const employeeId = req.user.id; 

        // Fetch and sort payments
        const payments = await Payment.find({ employeeId })
            .sort({ year: 1, month: 1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        const totalPayments = await Payment.countDocuments({ employeeId });
        res.json({
            payments,
            totalPages: Math.ceil(totalPayments / limit),
            currentPage: parseInt(page),
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


module.exports = { payment, createPay }