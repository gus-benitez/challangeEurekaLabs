'use strict'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const cotizacionRouter = require('./routes/api/cotizacion')
const { config } = require('./config/index')

const port = config.port

// middlewares
app.use(bodyParser.json())

// routes
app.use('/api/cotizacion', cotizacionRouter)

const server = app.listen(port, () => {
  console.log(`Server listening on port ${server.address().port}`)
})
