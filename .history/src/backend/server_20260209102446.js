const express = require("express")
require("dotenv").config()
const cors = require("cors")

const connectdb = require("./config/db.js")

connectdb()