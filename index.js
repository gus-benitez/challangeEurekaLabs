'use strict'
const express = require('express')
const app = express()

const { config } = require('./config/index')

const port = config.port

const server = app.listen(port, () => {
  console.log(`Server listening on port ${server.address().port}`)
})
