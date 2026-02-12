const express = require("express")
const router = required.Router()

const sendcontactMail "../controller/contactController"

router.post("/",sendcontactMail)

module.exports = router