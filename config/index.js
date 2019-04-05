'use strict'
require('dotenv').config()

const config = {
  port: process.env.PORT || 3000,
  apikey: process.env.APIKEY
}

module.exports = { config }
