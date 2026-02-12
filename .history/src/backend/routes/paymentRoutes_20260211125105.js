const express = require("express")
const router = express.Router()
const { createOrder } from "../controller/paymentController"

router.post("/create-order",createOrder)

module.exports = router