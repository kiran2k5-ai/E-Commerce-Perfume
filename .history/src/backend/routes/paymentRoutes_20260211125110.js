const express = require("express")
const router = express.Router()
const { createOrder } =  "../controller/paymentController"

router.post("/create-order",createOrder)

module.exports = router