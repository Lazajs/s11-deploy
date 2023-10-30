import express from 'express'

import {
  sendChatMessage,
  getAllChatMessages,
  setViewedState
} from '../controllers/Chat'
const router = express.Router()

router.post('/', sendChatMessage)
router.get('/:receiverId', getAllChatMessages)
router.put('/:receiverId/:senderId', setViewedState)

export { router }
