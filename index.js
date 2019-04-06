'use strict'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

require('./lib/mongo/connectionDB')
require('./utils/user/strategies/local-auth')
const cotizacionRouter = require('./routes/api/cotizacion')
const userRouter = require('./routes/api/user')
const { config } = require('./config/index')

const port = config.port

// middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// routes
app.use('/api/cotizacion', cotizacionRouter)
app.use('/api/user', userRouter)

const server = app.listen(port, () => {
  console.log(`Server listening on port ${server.address().port}`)
})
