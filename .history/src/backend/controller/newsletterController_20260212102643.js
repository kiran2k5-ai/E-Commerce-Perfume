const Newsletter = require("../model/Newsletter")

const subscribe = async (req, res) => {
    try {
        const { email } = req.body

        const exists = await Newsletter.findOne({ email })
        
        if (exists) {
            return res.status(400).json({ message: 'Email already subscribed' })
        }

        const subscription = await Newsletter.create({ email })

        res.status(201).json({ message: 'Successfully subscribed to newsletter' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getAllSubscribers = async (req, res) => {
    try {
        const subscribers = await Newsletter.find({}).sort({ subscribedAt: -1 })
        res.json(subscribers)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { subscribe, getAllSubscribers }
