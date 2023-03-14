const { Router } = require('express')
const { login, signup, refresh } = require('../controller/user.controller')

userRoutes = Router()

userRoutes.post('/login',login)
userRoutes.post("/signup",signup)
userRoutes.post('/refresh',refresh)
module.exports={userRoutes}