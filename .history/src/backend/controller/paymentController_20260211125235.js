const { Currency } = require("lucide-react")

const Razorpay = require("razorpay")

const razorpay = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const createOrder = async(req,res) => {
    const amount = req.body

    try{
        const option ={
            amount : amount * 100,
            currency : "INR",
            receipt : "order_rcptid_11"
        }

        const order = await razorpay.order.create(option)
        res.json(order)
    }
    catch(error){
        res.json(500).send(error)
    }
}

module.exports = {createOrder}