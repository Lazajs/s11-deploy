import express, { type Router } from 'express'
import { deleteNotification } from '../controllers/Notification/deleteNotification'

const router: Router = express.Router()

router.delete('/:userId/:messageId', deleteNotification)

export { router }
