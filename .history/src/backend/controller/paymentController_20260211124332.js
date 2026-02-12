const { Currency } = require("lucide-react")

const Razorpay = required("razorpay")

const razorpay = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const createOrder = async(req,res) => {
    const amount = req.body

    try{
        const option ={
            amount = amount,
            currency = "INR",
            rece
        }
    }
}