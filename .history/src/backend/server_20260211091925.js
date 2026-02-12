const express = require("express")
require("dotenv").config()
const cors = require("cors")
const app = express()
const connectdb = require("./config/db.js")
const productroutes = require("./routes/productRoutes.js")

app.use(cors())
app.use(express.json())
app.use("/api/product",productroutes)
app.use("api/conatct")
app.listen(5000,()=>{
    console.log("Server Running at port 5000")
})

connectdb()