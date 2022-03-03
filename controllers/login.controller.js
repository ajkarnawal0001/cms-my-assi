const express = require("express")
const router = express.Router()

const UserData = require("../models/user.models")

const bcrypt = require("bcryptjs")

const jwt = require('jsonwebtoken')
router.get('/', (req, res) => {
    return res.status(200).json({ data: "hello loginpage" })

})
router.post("/", async (req,res)=>{
    const {username,password} = req.body;

    const user = await UserData.findOne({username:username})

    if(!user){
        return res.status(400).json({
            error:"true",
            message:"User not found"
        })
    }else{
        const isPassMatch = await bcrypt.compare(password,user.password)
        if(!user.tokens){
            const token = await user.generateAuthToken()
            console.log(token)
            res.cookie('vlogtoken',token,{
                expires:new Date(Date.now()+25892000000),
                httpOnly:true,
            })
        }
        if(!isPassMatch){
            res.status(400).json({
                error:'true',
                message:'You have entered wrong password'
            })
        }else{
            res.status(200).json({
                error:'false',
                message:'User Logged in successfully',
                user:user
            })
        }
    }
})

module.exports = router