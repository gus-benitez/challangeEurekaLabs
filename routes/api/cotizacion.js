'use strict'

const express = require('express')
const router = express.Router()

const getCotization = require('../../services/cotizacion')

router.get('/', async function (req, res, next) {
  try {
    const cotiz = await getCotization(req.query)

    res.status(200).json({
      data: cotiz,
      message: 'Cotización Listada'
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
