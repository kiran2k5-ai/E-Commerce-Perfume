const jwt = require("jsonwebtoken")
const User = require("../model/User")

const protect = async (req, res, next) => {
    try {
        let token
        
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }

        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production')
        
        req.user = await User.findById(decoded.id).select('-password')
        
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' })
        }

        next()
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' })
    }
}

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next()
    } else {
        res.status(403).json({ message: 'Not authorized as admin' })
    }
}

module.exports = { protect, admin }
