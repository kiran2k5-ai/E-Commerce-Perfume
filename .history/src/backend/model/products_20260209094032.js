const express = require("express")
const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
    }
)