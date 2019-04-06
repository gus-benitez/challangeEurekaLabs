const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

const { config } = require('../../config/index')
// JWT strategy
require('../../utils/user/strategies/jwt')

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

router.post('/login', function (req, res, next) {
  passport.authenticate('local-login', function (err, user, info) {
    if (err) { return next(err) }
    if (!user) { return res.json(info) }

    req.login(user, { session: false }, async function (error) {
      if (error) {
        next(error)
      }
      const payload = { sub: user.email, name: user.name }
      const token = jwt.sign(payload, config.authJwtSecret, {
        expiresIn: '15m'
      })

      return res.status(200).json({ access_token: token })
    })
  })(req, res, next)
})

router.get('/logout',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    req.logout()
    return res.status(200).json({ access_token: 'no token provided' })
  })

module.exports = router
