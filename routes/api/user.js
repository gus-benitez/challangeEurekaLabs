const express = require('express')
const router = express.Router()
const passport = require('passport')
/* const jwt = require('jsonwebtoken') */

// Basic strategy
// require('../../utils/user/strategies/basic')
// const createUser = require('../../services/createUser')

router.post('/signup', function (req, res, next) {
  passport.authenticate('local-signup', async function (err, user, info) {
    if (err) { return next(err) }
    if (!user) { return res.json(info) }

    res.status(200).json({
      data: { id: user._id },
      message: 'Usuario Creado'
    })
  })(req, res, next)
})

module.exports = router
