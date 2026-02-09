const express = require("express")
require("dotenv").config()
const cors = require("cors")
const app = express()
const connectdb = require("./config/db.js")
const productroutes = require("./routes/productRoutes.js")

app.use(cors())
app.use(express.json())
app.use("/api/product",productroutes)

app.liste

connectdb()