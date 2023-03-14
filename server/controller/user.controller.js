const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { userModel } = require('../model/userModel')
require('dotenv').config()
const generateToken ={
    token:(user) => jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: "10m",
    }),
    refreshToken:(user)=>jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1d",
    })
}
const signup = async(req,res) => {
    const { username, email, password } = req.body 

    const user = await userModel.findOne({ email })
    if(user)return res.status(400).send({response:'User Already Exists',success:false})
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                return res.status(400).send({response:err.message,success:false})
            }
            const user = new userModel({ email, password: hash, username })
            await user.save()
            res.status(201).send({ response: "User created",success:true })
        })
    } catch (error) {
        res.status(500).send({ response:error.message,success:false })
    }
    
}


const login = async(req,res) => {
    const { email, password } = req.body 
    const user = await userModel.findOne({ email })
    if(!user) return res.status(401).send({response:"Please Login",success:false})
    try {
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                const refreshToken = generateToken.refreshToken(user)
                const token = generateToken.token(user)
                res.cookie("refershToken", refreshToken, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000,
                });
                res.cookie('token', token, {
                    httpOnly: true,
                    maxAge: 24 *60* 60 * 1000
                })
                res.status(200).send({response:"Login Successfully",token,refreshToken})
            }
       })
    } catch (error) {
        res.status(400).send({response:error.message,success:false})
    }
}

const refresh = async(req, res) => {
    const { refreshToken } = req.body 
    if (!refreshToken) return res.status(400).send({ response: 'refresh token Invalid' })
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.status(401).send({ response: 'Refresh token expired' ,err})
            else {
                const token = generateToken.token(decoded.user)
                res.cookie('token', token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000
                })
                res.status(201).send({response:'Token generated',token})
           }
       })
    
}
module.exports={signup,login,refresh}