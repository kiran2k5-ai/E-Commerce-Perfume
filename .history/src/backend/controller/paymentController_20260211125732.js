const Razorpay = require("razorpay")

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

const createOrder = async (req, res) => {
  try {
    const { amount } = req.body

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now()
    }

    const order = await razorpay.orders.create(options)

    res.status(200).json(order)
  } catch (error) {
    console.log("RAZORPAY ERROR:", error)
    res.status(500).json({ message: error.message })
  }
}

module.exports = { createOrder }
