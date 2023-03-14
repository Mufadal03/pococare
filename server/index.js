const express = require('express')
const cors = require('cors')
const { connection } = require('./config/db')
const { userRoutes } = require('./routes/user.routes')
const { todoRoutes } = require('./routes/todo.routes')
const { authenticator } = require('./middleware/authentication')
const app = express()
require('dotenv').config()
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 8080 


app.get('/', (req, res) => {
    res.send('running')
})

app.use('/user',userRoutes)
app.use('/todos',authenticator,todoRoutes)


app.listen(PORT, async () => {
    try { 
        await connection 
        console.log('connected')
    } catch (error) {
        console.log('connection failed',error)
    }
    console.log(`running on http://localhost:${PORT}`)
})
