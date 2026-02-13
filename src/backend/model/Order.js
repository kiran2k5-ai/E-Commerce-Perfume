const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        userEmail: {
            type: String,
            required: true
        },
        items: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products'
            },
            name: String,
            image: String,
            price: Number,
            quantity: Number
        }],
        totalAmount: {
            type: Number,
            required: true
        },
        paymentId: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
            default: 'pending'
        },
        shippingAddress: {
            address: String,
            city: String,
            postalCode: String,
            country: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
)

const Order = mongoose.model("Order", orderSchema)

module.exports = Order
