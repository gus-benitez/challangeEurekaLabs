'use strict'
const mongoose = require('mongoose')

const { config } = require('../../config')

const MONGO_URI = `mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`

// mongoose.set('debug', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true
})
  .then(db => console.log('DB Mongo is connected'))
  .catch(err => console.log(err))
