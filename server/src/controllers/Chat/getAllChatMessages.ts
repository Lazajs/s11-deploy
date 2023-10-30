import { type Request, type Response } from 'express'
import mongoose from 'mongoose'

import Chat from '../../db/models/Chat'
import User from '../../db/models/User'

const getAllChatMessages = async (req: Request, res: Response) => {
  try {
    const myUserId = req.params?.receiverId

    if (!myUserId) {
      throw new Error('Field receiverId is required.')
    }

    const receiverIdObject = new mongoose.Types.ObjectId(myUserId)

    const messages = await Chat.find({
      $or: [
        { receiver: receiverIdObject }
      ]
    }).sort({ timestamp: 1 })

    if (messages.length > 0) {
      const conversations: Record<string, { userData: any, messages: any[] }> = {}

      const userIds = Array.from(new Set(messages.flatMap((message) => [message.sender, message.receiver])))

      const users = await User.find({ _id: { $in: userIds } })

      const userDataMap: Record<string, { avatar: string, name: string }> = {}
      users.forEach((user) => {
        userDataMap[user._id.toString()] = {
          avatar: user.image,
          name: user.name
        }
      })

      messages.forEach((message) => {
        const otherUserId = message.sender === myUserId ? message.receiver : message.sender
        if (!conversations[otherUserId]) {
          conversations[otherUserId] = {
            userData: userDataMap[otherUserId],
            messages: []
          }
        }
        conversations[otherUserId].messages.push(message)
        conversations[otherUserId].messages.sort((a, b) => a.timestamp - b.timestamp)
      })

      return res.status(200).json({ data: conversations })
    } else {
      return res.status(404).json({ data: 'There are no conversations for this user' })
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message, error: 'Get Chat Conversations' })
    } else {
      return res.status(500).json({ message: 'An unexpected error occurred', error: 'Get Chat Conversations' })
    }
  }
}

export { getAllChatMessages }
