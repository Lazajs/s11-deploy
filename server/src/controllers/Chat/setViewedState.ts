import Chat from '../../db/models/Chat'
import { type Request, type Response } from 'express'

const setViewedState = async (req: Request, res: Response) => {
  try {
    const { receiverId, senderId } = req.params || {}

    if (!receiverId || !senderId) {
      throw new Error('All fields are required (receiverId, senderId).')
    }

    await Chat.updateMany(
      { sender: senderId, receiver: receiverId, viewed: false },
      { $set: { viewed: true } }
    )

    return res.status(200).json({ message: `Messages from ${receiverId} marked as viewed` })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message, error: 'Set Viewed State' })
    } else {
      return res.status(500).json({ message: 'An unexpected error occurred', error: 'Set Viewed State' })
    }
  }
}

export { setViewedState }
