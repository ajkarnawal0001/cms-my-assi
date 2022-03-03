const express = require('express')

const UserData = require('../models/user.models')
const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')
const router = express.Router()

// Registration for user

router.get('/', (req,res) =>{
    return res.status(200).json({data:'hello registration page'})
})

router.post('/',async (req,res)=>{
    const {username, fullname, email,password} = req.body

    if(!username || !fullname || !email || !password){
        return res.status(422).json({error:true, message:'Please fill all details'})
    }

    try {
        const isUser = await UserData.findOne({username:username})
        const isEmail = await UserData.findOne({email:email})

        if(isUser){
            return res.status(422).json({
                error:'true',
                message:'user already exists'
            })
        }
        if(isEmail){
            return res.status(422).json({
                error:'true',
                message:'Email already exists'
            })
        }
        const newuser = await UserData.create(req.body)
        if(newuser){
            res.status(201).json({error:'false',message:'User registered successfully'})
        }else{
            res.status(500).json({error:'true',message:'Something went wrong'})
        }
    } catch (error) {
        return res.status(500).json({error:'true',message:`${error}`})    
    }
})

module.exports = router