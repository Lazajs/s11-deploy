import mongoose from 'mongoose'
import Message from '../../db/models/Notification'
import { loadNotifications } from '../../sockets/socket'

const createNotification = async (data: {
  sender: string
  receiver: string
  message: string
}) => {
  try {
    const { sender, receiver, message } = data

    if (!message || !receiver || !sender) {
      throw new Error('All fields are required (sender, receiver, message).')
    }

    const senderIdObject = new mongoose.Types.ObjectId(sender)
    const receiverIdObject = new mongoose.Types.ObjectId(receiver)

    const newNotification = new Message({
      sender: senderIdObject,
      receiver: receiverIdObject,
      message
    })

    await newNotification.save()

    await loadNotifications(receiver)

    return { data: newNotification, message: 'Notification Created' }
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message, error: 'Create Notification' }
    } else {
      return { message: 'An unexpected error occurred', error: 'Create Notification' }
    }
  }
}

export { createNotification }

// Sender ID (userId) - Receiver ID (userId) - Message for notification

// createNotification({sender: "124141", receiver: "15828", message: "There is an event near you!"})
