const express = require('express')
const { urlencoded, json } = require('body-parser')
const path = require('path')
const cors = require('cors')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.middlewares()
    this.views()
    this.routes()
  }

  middlewares () {
    this.express.use(cors())
    this.express.use(json())
    this.express.use(urlencoded({ extended: false }))
  }

  views () {
    this.express.use(express.static(path.resolve(__dirname, '..', 'public')))
    this.express.set('views', path.resolve(__dirname, '..', 'views'))
    this.express.set('view engine', 'ejs')
  }
  routes () {
    this.express.use(require('../routes'))
  }
}

module.exports = new App().express
