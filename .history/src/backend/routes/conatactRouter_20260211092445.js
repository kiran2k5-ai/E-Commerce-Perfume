const express = require("express")
const router = required.Router()

const sendcontactMail = require"../controller/contactController"

router.post("/",sendcontactMail)

module.exports = router