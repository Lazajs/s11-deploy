import { Server, type Socket } from 'socket.io'
import { config } from 'dotenv'
import type http from 'http'
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

  const getNotifications = await Message.find({ receiver: userId })
  // Emit the new notification to the specific client
  io.to(userId).emit('notifications', getNotifications)
}

export { configureSocketIO, loadNotifications }
