import { Request, Response } from 'express'
import mongoose, { ObjectId } from 'mongoose'
import Chat from '../../db/models/Chat'
import { notifyChatMessage } from '../../sockets/socket'

const sendChatMessage = async (req: Request, res: Response) => {
  try {
    const { senderId, receiverId, message } = req.body || {}

    if (!senderId || !receiverId || !message) {
      throw new Error('All fields are required (senderId, receiverId, and message).')
    }

    const senderIdObject = new ObjectId(senderId)
    const receiverIdObject = new ObjectId(receiverId)

    const newChatMessage = new Chat({
      sender: senderIdObject,
      receiver: receiverIdObject,
      message,
    })

    await newChatMessage.save()

    await notifyChatMessage(senderId, receiverId, message, newChatMessage.timestamp)

    return res.status(201).json({ newMessage: newChatMessage, message: 'Chat Message Created' })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message, error: 'Create Chat Message' })
    } else {
      return res.status(500).json({ message: 'An unexpected error occurred', error: 'Create Chat Message' })
    }
  }
}

export { sendChatMessage }
