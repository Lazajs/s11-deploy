import { Server, type Socket } from 'socket.io'
import { config } from 'dotenv'
import type http from 'http'
import mongoose from 'mongoose'
import Message from '../db/models/Notification'

config()
let io: Server

const frontEndURL = process.env.FRONT_END_URL

if (!frontEndURL) {
  throw new Error('FRONT_END_URL environment variable is not set.')
}

const configureSocketIO = (httpServer: http.Server) => {
  io = new Server(httpServer, {
    cors: {
      origin: [frontEndURL]
    }
  })

  io.on('connection', (socket: Socket) => {
    const userId = socket.handshake.query.userId // Get the user's ID from the client (stored in cookies or localstorage)

    if (userId) {
      socket.join(userId)?.catch(console.error)
    }

    socket.on('getNotifications', async (userId: string) => {
      // Retrieve messages from the database for the user
      try {
        await loadNotifications(userId)
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    })
  })
}

const loadNotifications = async (userId: string) => {
  if (!io) {
    throw new Error('Socket.io has not been configured yet.')
  }

  const userIdObject = new mongoose.Types.ObjectId(userId)

  const getNotifications = await Message.aggregate([
    {
      $match: {
        receiver: userIdObject
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'receiver',
        foreignField: '_id',
        as: 'userData'
      }
    },
    {
      $unwind: '$userData'
    },
    {
      $project: {
        _id: 0,
        'userData.name': 1,
        'userData.image': {
          $ifNull:
          [
            '$userData.image',
            'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
          ]
        },
        message: 1,
        timestamp: 1
      }
    }
  ])

  // Emit the new notification to the specific client
  io.to(userId).emit('notifications', getNotifications)
}

const notifyChatMessage = async (sender: string, receiver: string, message: string, timestamp: string) => {
  if (!io) {
    throw new Error('Socket.io has not been configured yet.')
  }

  const data = {
    sender,
    receiver,
    message,
    timestamp
  }

  io.to(receiver).emit('chatNotifications', data)
}

export { configureSocketIO, loadNotifications, notifyChatMessage }
