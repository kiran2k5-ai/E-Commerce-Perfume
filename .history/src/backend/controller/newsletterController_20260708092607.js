const Newsletter = require("../model/Newsletter")
const nodemailer = require('nodemailer')
const mongoose = require('mongoose')

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

const deleteSubscriber = async (req, res) => {
    try {
        const id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' })
        await Newsletter.findByIdAndDelete(id)
        res.json({ message: 'Subscriber deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const sendEmail = async (req, res) => {
    try {
        const { subject, message, toAll, id } = req.body

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })

        let recipients = []
        if (toAll) {
            const subs = await Newsletter.find({})
            recipients = subs.map(s => s.email)
        } else if (id) {
            const sub = await Newsletter.findById(id)
            if (!sub) return res.status(404).json({ message: 'Subscriber not found' })
            recipients = [sub.email]
        } else {
            return res.status(400).json({ message: 'No recipients specified' })
        }

        if (recipients.length === 0) return res.status(400).json({ message: 'No recipients' })

        // send single email with BCC to recipients
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            bcc: recipients.join(','),
            subject,
            text: message,
            html: `<div>${message.replace(/\n/g, '<br/>')}</div>`
        })

        res.json({ message: 'Emails sent' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

module.exports = { subscribe, getAllSubscribers, deleteSubscriber, sendEmail }
