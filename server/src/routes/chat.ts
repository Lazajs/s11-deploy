import express, { type Router } from 'express'

import {
  sendChatMessage,
  getAllChatMessages,
  setViewedState
} from '../controllers/Chat'

const router: Router = express.Router()

router.post('/', sendChatMessage)
router.get('/:receiverId', getAllChatMessages)
router.post('/:userId/:senderId', setViewedState)

export default router
