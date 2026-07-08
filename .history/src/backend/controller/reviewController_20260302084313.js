const Review = require("../model/Review")
const Product = require("../model/products")

const createReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body

        const product = await Product.findById(productId)
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        const review = await Review.create({
            product: productId,
            user: req.user._id,
            userName: req.user.name,
            rating,
            comment
        })

        res.status(201).json(review)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getProductReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.productId })
            .sort({ createdAt: -1 })
            .populate('user', 'name')

        res.json(reviews)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)

        if (!review) {
            return res.status(404).json({ message: 'Review not found' })
        }

        if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' })
        }

        await review.deleteOne()
        res.json({ message: 'Review removed' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { createReview, getProductReviews, deleteReview }
