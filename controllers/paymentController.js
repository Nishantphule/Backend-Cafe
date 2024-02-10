const Razorpay = require('razorpay');
const { KEY_ID_RAZORPAY, SECRET_RAZORPAY } = require('../utils/config');

const paymentController = {
    createOrder: async (req, res) => {
        try {
            const razorpay = new Razorpay({
                key_id: KEY_ID_RAZORPAY,
                key_secret: SECRET_RAZORPAY
            });

            const options = req.body;
            const order = await razorpay.orders.create(options);

            if (!order) {
                return res.status(500).send({ message: "Server Error" })
            }
            res.status(200).json({ order })
        } catch (error) {
            res.status(500).send({ message: "Server Error", error })
        }

    }
}

module.exports = paymentController;