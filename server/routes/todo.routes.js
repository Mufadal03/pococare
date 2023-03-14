const { Router } = require('express')
const { model } = require('mongoose')
const { getTodos } = require('../controller/todo.controller')

todoRoutes = Router()

todoRoutes.get('/',getTodos)

module.exports={todoRoutes}