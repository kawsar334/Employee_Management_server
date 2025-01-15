const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    month: { type: String, required: true }, // e.g., "January"
    year: { type: Number, required: true },
    amount: { type: Number, required: true },
    // transactionId: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
}); 
 
module.exports = mongoose.model('Payment', paymentSchema);

// Payment Schema
// const paymentSchema = new mongoose.Schema({
//     employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     amount: { type: Number, required: true },
//     paymentDate: { type: Date, default: Date.now },
//     approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// }, { timestamps: true });