import express from 'express'
import validateToken from '../middlewares/validateToken'
import { EventController } from '../controllers/event'

const router = express.Router()

router.get('/', EventController.getEvents)

router.post('/', validateToken, EventController.newEvent)

router.get('/:id', EventController.getById)

router.delete('/:id', validateToken, EventController.deleteEvent)

router.put('/:id', validateToken, EventController.updateEvent)

export { router }
