const express = require('express');
const paymentRouter = express.Router();
const paymentController = require('../controllers/paymentController')

// create order

paymentRouter.post('/createOrder', paymentController.createOrder)
paymentRouter.post("/success", paymentController.success);


module.exports = paymentRouter;