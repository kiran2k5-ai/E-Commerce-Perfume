const User = require("../model/User")

const addToFavorites = async (req, res) => {
    try {
        const { productId } = req.body
        const user = await User.findById(req.user._id)

        if (!user.favorites.includes(productId)) {
            user.favorites.push(productId)
            await user.save()
        }

        res.json({ message: 'Added to favorites', favorites: user.favorites })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const removeFromFavorites = async (req, res) => {
    try {
        const { productId } = req.params
        const user = await User.findById(req.user._id)

        user.favorites = user.favorites.filter(id => id.toString() !== productId)
        await user.save()

        res.json({ message: 'Removed from favorites', favorites: user.favorites })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('favorites')
        res.json(user.favorites)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { addToFavorites, removeFromFavorites, getFavorites }
