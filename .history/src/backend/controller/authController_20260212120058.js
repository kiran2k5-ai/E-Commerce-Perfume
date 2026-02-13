const User = require("../model/User")
const jwt = require("jsonwebtoken")

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'your-secret-key-change-in-production', {
        expiresIn: '30d'
    })
}

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        console.log('Registration attempt:', { name, email })

        const userExists = await User.findOne({ email })
        
        if (userExists) {
            console.log('User already exists:', email)
            return res.status(400).json({ message: 'User already exists' })
        }

        const user = await User.create({
            name,
            email,
            password
        })

        console.log('User created successfully:', user._id)

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            })
        }
    } catch (error) {
        console.error('Registration error:', error)
        res.status(500).json({ message: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (user && (await user.comparePassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                scentProfile: user.scentProfile,
                token: generateToken(user._id)
            })
        } else {
            res.status(401).json({ message: 'Invalid email or password' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password')
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)

        if (user) {
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            user.scentProfile = req.body.scentProfile || user.scentProfile
            
            if (req.body.password) {
                user.password = req.body.password
            }

            const updatedUser = await user.save()

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                scentProfile: updatedUser.scentProfile,
                token: generateToken(updatedUser._id)
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { register, login, getProfile, updateProfile }
