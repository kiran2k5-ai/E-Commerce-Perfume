const express = require("express")
const router = required.Router()

import { sendcontactMail } from "../controller/contactController"

router.post("/",sendcontactMail)