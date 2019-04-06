'use strict'
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../../../lib/mongo/models/user')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({ 'email': email })
  if (user) {
    return done(null, false, { user: false, message: 'Email ya registrado' })
  } else {
    const newUser = new User()
    newUser.email = email
    newUser.password = newUser.encryptPassword(password)
    newUser.name = req.body.name

    await newUser.save()
    done(null, newUser)
  }
}))

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({ email: email })
  if (!user) {
    return done(null, false, { user: false, message: 'Usuario no encontrado.' })
  }
  if (!user.comparePassword(password)) {
    return done(null, false, { user: false, message: 'Contraseña incorrecta.' })
  }
  return done(null, user)
}))
