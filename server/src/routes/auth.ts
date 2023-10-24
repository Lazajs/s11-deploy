import { Router } from 'express'
import { AuthController } from '../controllers/auth'
import validateToken from '../middlewares/validateToken'
import passport from 'passport'
import populateUser from '../middlewares/populateUser'

const router = Router()

router.post('/signup', AuthController.signup)
router.post('/signin', AuthController.signin)
router.get('/logout', AuthController.logout)
router.get('/me', validateToken, populateUser, AuthController.me)
router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
)

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/auth/failure'
  })
)

export { router }
