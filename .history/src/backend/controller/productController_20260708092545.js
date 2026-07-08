const product = require("../model/products")

const getProducts = async (req, res) => {
    try {
        const prod = await product.find()
        res.json(prod)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getProductById = async (req, res) => {
    try {
        const prod = await product.findById(req.params.id)
        if (!prod) {
            return res.status(404).json({ message: "No data found for this id" })
        }
        res.json(prod)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createProduct = async (req, res) => {
    try {
        const prod = new product(req.body)
        const savedProduct = await prod.save()
        res.status(201).json(savedProduct)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const updateProduct = async (req, res) => {
    try {
        const prod = await product.findById(req.params.id)
        if (!prod) {
            return res.status(404).json({ message: 'Product not found' })
        }

        Object.assign(prod, req.body)
        const updated = await prod.save()
        res.json(updated)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const prod = await product.findById(req.params.id)
        if (!prod) {
            return res.status(404).json({ message: 'Product not found' })
        }

        await prod.deleteOne()
        res.json({ message: 'Product deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const uploadProductImage = async (req, res) => {
    try {
        const prod = await product.findById(req.params.id)
        if (!prod) return res.status(404).json({ message: 'Product not found' })

        if (!req.file) return res.status(400).json({ message: 'No file uploaded' })

        // Save URL relative to server static uploads
        prod.image = `/uploads/${req.file.filename}`
        const updated = await prod.save()
        res.json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getrelatedProducts = async (req, res) => {
    const { category, id } = req.body
    try {
        const prod = await product.find({
            category,
            _id: { $ne: id }
        }).limit(6)
        res.json(prod)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getrelatedProducts }
