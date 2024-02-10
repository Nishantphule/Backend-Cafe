const express = require('express');
const paymentRouter = express.Router();
const paymentController = require('../controllers/paymentController')

// create order
paymentRouter.post('/createOrder', paymentController.createOrder)

module.exports = paymentRouter;