const express = require('express')
const routes = express.Router()

const controllers = require('./controllers')
routes.get('/', controllers.ChatController.index)

module.exports = routes
