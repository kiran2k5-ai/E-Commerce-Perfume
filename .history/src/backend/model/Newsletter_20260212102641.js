const mongoose = require("mongoose")

const newsletterSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        subscribedAt: {
            type: Date,
            default: Date.now
        }
    }
)

const Newsletter = mongoose.model("Newsletter", newsletterSchema)

module.exports = Newsletter
