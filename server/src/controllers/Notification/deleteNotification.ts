import { Request, Response } from 'express'
import mongoose, { Document } from 'mongoose'
import Message, { IMessage } from '../../db/models/Notification'
import { loadNotifications } from '../../sockets/socket'

const deleteNotification = async (req: Request, res: Response) => {
  try {
    const { userId, messageId } = req.params

    if (!userId && !messageId) {
      throw new Error('All fields are required (userId, _id).')
    }

    const deletedNotification = await Message.findByIdAndDelete(messageId)

    if(deletedNotification)
    {
      loadNotifications(userId)
    }

    return res.status(201).json({ data: { notification: deletedNotification }, message: "Notification deleted" })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message, error: 'Delete Notification' })
    } else {
      return res.status(500).json({ message: 'An unexpected error occurred', error: 'Delete Notification' })
    }
  }
}

export { deleteNotification }