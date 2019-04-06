'use strict'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const passport = require('passport')
var fs = require('fs')
var path = require('path')
const morgan = require('morgan')

require('./lib/mongo/connectionDB')
require('./utils/user/strategies/local-auth')
const cotizacionRouter = require('./routes/api/cotizacion')
const userRouter = require('./routes/api/user')
const { config } = require('./config/index')

const port = config.port
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'invest-api.log'), { flags: 'a' })

// middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(passport.initialize())
// timestamp | host | url | action | data
morgan.token('body', function getId (req) {
  return JSON.stringify(req.body)
})
app.use(morgan(`:date[iso] | :remote-addr | :url | :method | :body`, { stream: accessLogStream }))

// routes
app.use('/api/cotizacion', cotizacionRouter)
app.use('/api/user', userRouter)

const server = app.listen(port, () => {
  console.log(`Server listening on port ${server.address().port}`)
})

// Manejo de errores global de la la aplicación
process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

function handleFatalError (err) {
  console.error(err.stack)
  // Aqui deberia agregarse algun servicio de tracking de errores como Rollbar
}
