'use strict'
require('dotenv').config()

const config = {
  port: process.env.PORT || 3000,
  apikey: process.env.APIKEY,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: process.env.DB_PORT || 27017,
  dbName: process.env.DB_NAME,
  authJwtSecret: process.env.AUTH_JWT_SECRET
}

module.exports = { config }
