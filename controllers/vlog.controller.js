const express = require('express')
const router = express.Router()

// const fs = require('fs')
// require("../utils/cloudinary.config")
// const upload = require("../utils/multer")
const UsersData = require('../models/user.models')
const VlogsData = require("../models/vlog.model")
router.get("/",async function(req,res){
    try {
        const page = +req.query.page || 1
        const size = +req.query.limit || 10
        const offset = (page-1)*size

        const vlog = await VlogsData.find().sort({createdAt:'desc'}).skip(offset).limit(size).populate("userId").lean().exec()

        return res.status(200).json({
            error:"false",
            data:vlog
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            error: "true",
            message: "Something went wrong"
        })
    }
})


router.post("/",async function (req,res){
    const {image,author,title,category,city,shortSummary,webURL,userId,} = req.body

    if(!author || !title || !category || !city){
        return res.status(422).json({
            error:true,
            message:'Please fill all details properly'
        })
    }
    try {
        const isUser = await UsersData.findOne({_id:userId})
        if(!isUser){
            return res.status(422).json({
                error: "true",
                message: "User Dosen't exists"
            })
        }
        const vlog = await VlogsData.create(req.body);
        
        return res.status(201).json({
            error: "false",
            data: vlog
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error: true,
            message: "Something went wrong please try again"
        })
    }
})
module.exports = router