import mongoose from 'mongoose'
import { type DatabaseUser, Category } from '../../types'

const userSchema = new mongoose.Schema<DatabaseUser>({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  nextEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  ownEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }],
  passwordHash: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  image: {
    type: String,
    required: true,
    default:
      'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
  },
  birthdate: {
    type: String,
    required: true
  },
  googleId: {
    type: String
  },
  interests: [{
    type: String,
    enum: Object.values(Category)
  }]
})

export default mongoose.models.User ||
  mongoose.model<DatabaseUser>('User', userSchema)
