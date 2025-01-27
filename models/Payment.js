const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: '', required: true },
    name:{
        type: String, required: true
    },
    month: { type: String, required: true },
    year: { type: Number, required: true },
    amount: { type: Number, required: true },
    transactionId: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
}); 
 
module.exports = mongoose.model('Payment', paymentSchema);
