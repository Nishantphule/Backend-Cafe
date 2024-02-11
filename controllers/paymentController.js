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
            res.status(200).json(order)
        } catch (error) {
            res.status(500).send({ message: "Server Error", error })
        }

    },
    success: async (req, res) => {
        try {
            // getting the details back from our font-end
            const {
                orderCreationId,
                razorpayPaymentId,
                razorpayOrderId,
                razorpaySignature,
            } = req.body;

            // Creating our own digest
            // The format should be like this:
            // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
            const shasum = crypto.createHmac("sha256", "w2lBtgmeuDUfnJVp43UpcaiT");

            shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

            const digest = shasum.digest("hex");

            // comaparing our digest with the actual signature
            if (digest !== razorpaySignature)
                return res.status(400).json({ msg: "Transaction not legit!" });

            // THE PAYMENT IS LEGIT & VERIFIED
            // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

            res.status(200).json({
                msg: "success",
                orderId: razorpayOrderId,
                paymentId: razorpayPaymentId,
            });
        } catch (error) {
            res.status(500).send({ error });
        }
    }
}

module.exports = paymentController;