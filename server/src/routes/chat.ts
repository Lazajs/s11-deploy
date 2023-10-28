import express from "express";
const router = express.Router();

import {
  sendChatMessage,
  getAllChatMessages,
  setViewedState,
} from "../controllers/Chat";

router.post('/', sendChatMessage)
router.get('/:receiverId', getAllChatMessages)
router.put('/:receiverId/:senderId', setViewedState)

export { router };
