import { Router } from 'express'
import { type Request, type Response } from 'express'
import { AuthController } from '../controllers/auth'
import validateToken from '../middlewares/validateToken'
import passport from 'passport'
import populateUser from '../middlewares/populateUser'

declare module 'express-session' {
  interface SessionData {
    user_id: any
  }
}

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
    // successRedirect: "/home",
    failureRedirect: '/auth/failure'
  }),
  (req: Request, res: Response) => {
    if (req.user) {
      req.session.user_id = req.user
    }
    res.redirect('http://localhost:3001/home')
  }
)

export { router }
