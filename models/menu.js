const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const menuSchema = new Schema({
    productName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

menuSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.productId = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Menu', menuSchema)