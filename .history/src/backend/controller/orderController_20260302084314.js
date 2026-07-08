const Order = require("../model/Order")

const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, paymentId, shippingAddress } = req.body

        const order = await Order.create({
            user: req.user._id,
            userName: req.user.name,
            userEmail: req.user.email,
            items,
            totalAmount,
            paymentId,
            shippingAddress,
            status: 'processing'
        })

        res.status(201).json(order)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
        res.json(orders)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email')

        if (!order) {
            return res.status(404).json({ message: 'Order not found' })
        }

        if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' })
        }

        res.json(order)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 }).populate('user', 'name email')
        res.json(orders)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)

        if (!order) {
            return res.status(404).json({ message: 'Order not found' })
        }

        order.status = req.body.status
        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { createOrder, getMyOrders, getOrderById, getAllOrders, updateOrderStatus }
