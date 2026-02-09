const express = require
require("dotenv").config()
const cors = require("cors")
console.log("Server started")
const connectdb = require("./config/db.js")
connectdb()