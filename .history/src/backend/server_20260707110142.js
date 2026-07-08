const express = require("express")
require("dotenv").config()
const cors = require("cors")
const app = express()
const connectdb = require("./config/db.js")
const productroutes = require("./routes/productRoutes.js")
const contactroutes = require("./routes/contactRouter.js")
const paymentController = require("./routes/paymentRoutes.js")
const authRoutes = require("./routes/authRoutes.js")
const reviewRoutes = require("./routes/reviewRoutes.js")
const wishlistRoutes = require("./routes/wishlistRoutes.js")
const favoritesRoutes = require("./routes/favoritesRoutes.js")
const orderRoutes = require("./routes/orderRoutes.js")
const newsletterRoutes = require("./routes/newsletterRoutes.js")

app.use(cors())
app.use(express.json())
app.use("/api/product",productroutes)
app.use("/api/contact",contactroutes)
app.use("/api/payment",paymentController)
app.use("/api/auth",authRoutes)
app.use("/api/reviews",reviewRoutes)
app.use("/api/wishlist",wishlistRoutes)
app.use("/api/favorites",favoritesRoutes)
app.use("/api/orders",orderRoutes)
app.use("/api/newsletter",newsletterRoutes)

const PORT = process.env.PORT || 5001

const startServer = async () => {
  await connectdb()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

startServer()