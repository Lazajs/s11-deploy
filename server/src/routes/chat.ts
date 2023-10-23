import express from 'express'
const router = express.Router()

import {
  sendChatMessage,
  getAllChatMessages,
  setViewedState
} from '../controllers/Chat'

router.post('/', sendChatMessage)
router.get('/:receiverId', getAllChatMessages)
router.post('/:userId/:senderId', setViewedState)

export default router
