import express from 'express'

import {
  sendChatMessage,
  getAllChatMessages,
  setViewedState
} from '../controllers/Chat'
const router = express.Router()

router.post('/', sendChatMessage)
router.get('/:receiverId', getAllChatMessages)
router.post('/:userId/:senderId', setViewedState)

export { router }
