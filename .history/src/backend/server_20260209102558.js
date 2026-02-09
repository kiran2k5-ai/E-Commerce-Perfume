const express = require("express")
require("dotenv").config()
const cors = require("cors")
const app = express()
const connectdb = require("./config/db.js")
const 

app.use(cors())
app.use(express.json())

connectdb()