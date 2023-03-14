const jwt = require('jsonwebtoken')
require('dotenv').config()
const authenticator = async (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).send({ response: 'Please Login to continue' })
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(400).send({response:err.message })
        else next()
    })
}
module.exports={authenticator}