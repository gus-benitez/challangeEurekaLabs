'use strict'
const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')

const { config } = require('../../../config')
const User = require('../../../lib/mongo/models/user')

passport.use(
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async function (tokenPayload, done) {
      try {
        const user = await User.findOne({ email: tokenPayload.sub })
        if (!user) {
          return done(null, false)
        }

        return done(null, user)
      } catch (error) {
        return done(error)
      }
    }
  )
)
