import { Router } from 'express'
import { AuthController } from '../controllers/auth'
import validateToken from '../middlewares/validateToken'

const router = Router()

router.post('/signup', AuthController.signup)
router.post('/signin', AuthController.signin)
router.get('/logout', AuthController.logout)
router.get('/me', validateToken, AuthController.me)

export default router
