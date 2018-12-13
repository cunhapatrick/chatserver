require('dotenv').config({ path: './config/env/.env' })
const app = require('./config/server')
const server = require('http').createServer(app)
const port = process.env.NODE_ENV || 3000

server.listen(port, () => console.log(`Server is listening on port ${port}...`))
require('./config/socket')(server)
