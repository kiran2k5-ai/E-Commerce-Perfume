const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        wishlist: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        }],
        favorites: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        }],
        scentProfile: {
            type: String,
            enum: ['floral', 'woody', 'citrus', 'oriental', 'fresh', ''],
            default: ''
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
)

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model("User", userSchema)

module.exports = User
