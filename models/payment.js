const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    name: {
        type: String
    },
    amount: {
        type: Number
    },
    order_id: {
        type: String
    },
    razorpay_payment_id: {
        type: String,
        default: null
    },
    razorpay_signature: {
        type: String,
        default: null
    }
}, {
    timestamps: true
})

paymentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.paymentId = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Payments', paymentSchema)