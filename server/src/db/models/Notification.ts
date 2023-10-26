import { type Document, model, Schema, type Types } from 'mongoose'

export interface IMessage extends Document {
  sender: Types.ObjectId
  receiver: Types.ObjectId
  message: string
  timestamp: Date
}

const messageSchema = new Schema<IMessage>({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})

export default model<IMessage>('Message', messageSchema)
