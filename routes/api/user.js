const express = require('express')
const router = express.Router()
const passport = require('passport')
// const jwt = require('jsonwebtoken')

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

    req.logIn(user, function (err) {
      if (err) { return next(err) }
      return res.json({ user: true, id: user._id })
    })
  })(req, res, next)
})

module.exports = router
