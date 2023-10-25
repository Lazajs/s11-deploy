import { Router } from 'express'
import validateToken from '../middlewares/validateToken'
import { UserController } from '../controllers/user'

const router = Router()

router.put('/', validateToken, UserController.update)

router.get('/:id', UserController.getById)

export { router }
