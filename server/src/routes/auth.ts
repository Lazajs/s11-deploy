import { Router } from 'express'
import { AuthController } from '../controllers/auth'

const router = Router()

router.post('/signup', AuthController.signup)
router.post('/signin', AuthController.signin)

export default router
