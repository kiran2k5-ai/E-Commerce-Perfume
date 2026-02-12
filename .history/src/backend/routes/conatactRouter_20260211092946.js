const express = require("express")
const router = express.Router()

const {sendcontactMail} = require("../controller/contactController")

router.post("/",sendcontactMail)

module.exports = router