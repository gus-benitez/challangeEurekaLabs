'use strict'
const express = require('express')
const app = express()

const port = process.env.PORT || 3000

const server = app.listen(port, () => {
  console.log(`Server listening on port ${server.address().port}`)
})
