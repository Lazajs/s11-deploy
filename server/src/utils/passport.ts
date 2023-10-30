import passport from 'passport'
import passportGoogle from 'passport-google-oauth20'
import bcrypt from 'bcryptjs'
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../utils/config'
import User from '../db/models/User'

const GoogleStrategy = passportGoogle.Strategy

passport.serializeUser(async (user: any, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3001/api/v1/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      const randomPassword = Math.random().toString(36).substring(7)
      const passwordHash = await bcrypt.hash(randomPassword, 10)
      const user = await User.findOne({ googleId: profile.id })
      if (!user) {
        const newUser = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0].value,
          passwordHash,
          image: profile.photos?.[0].value,
          birthdate: getFormattedDefaultBirthdate()
        })
        if (newUser) {
          done(null, newUser)
        }
      } else {
        done(null, user)
      }
    }
  )
)

function getFormattedDefaultBirthdate () {
  const currentDate = new Date()
  const defaultBirthdate = new Date(
    currentDate.getFullYear() - 18,
    currentDate.getMonth(),
    currentDate.getDate()
  )
  return defaultBirthdate.toISOString().split('T')[0]
}
