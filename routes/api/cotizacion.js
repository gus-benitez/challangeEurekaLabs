'use strict'
const express = require('express')
const router = express.Router()
const passport = require('passport')

// JWT strategy
require('../../utils/user/strategies/jwt')
const getCotization = require('../../services/cotizacion')

router.get('/',
  passport.authenticate('jwt', { session: false }),
  async function (req, res, next) {
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
