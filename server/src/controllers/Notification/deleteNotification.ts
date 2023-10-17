import { type Request, type Response } from 'express'
import Message from '../../db/models/Notification'
import { loadNotifications } from '../../sockets/socket'

const deleteNotification = async (req: Request, res: Response) => {
  try {
    const { userId, messageId } = req.params

    if (!userId && !messageId) {
      throw new Error('All fields are required (userId, _id).')
    }

    const deletedNotification = await Message.findByIdAndDelete(messageId)

    if (deletedNotification) {
      await loadNotifications(userId)
      return res.status(204).end()
    } else {
      return res.status(404).end()
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message, error: 'Delete Notification' })
    } else {
      return res.status(500).json({ message: 'An unexpected error occurred', error: 'Delete Notification' })
    }
  }
}

export { deleteNotification }
