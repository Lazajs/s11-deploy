import { type Document, model, Schema } from 'mongoose'

export interface IChat extends Document {
  sender: string
  receiver: string
  message: string
  viewed: boolean
  timestamp: Date
}

const chatSchema = new Schema<IChat>({
  sender: {
    type: Schema.Types.ObjectId as any,
    ref: 'User',
    required: true
  },
  receiver: {
    type: Schema.Types.ObjectId as any,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  viewed: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})

export default model<IChat>('Chat', chatSchema)
