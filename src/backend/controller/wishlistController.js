const User = require("../model/User")

const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body
        const user = await User.findById(req.user._id)

        if (!user.wishlist.includes(productId)) {
            user.wishlist.push(productId)
            await user.save()
        }

        res.json({ message: 'Added to wishlist', wishlist: user.wishlist })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params
        const user = await User.findById(req.user._id)

        user.wishlist = user.wishlist.filter(id => id.toString() !== productId)
        await user.save()

        res.json({ message: 'Removed from wishlist', wishlist: user.wishlist })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('wishlist')
        res.json(user.wishlist)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { addToWishlist, removeFromWishlist, getWishlist }
