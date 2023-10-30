import mongoose, { type Document, type Model, Schema, type Types } from 'mongoose'

export interface IReview extends Document {
  score: number
  text: string
  eventId: Types.ObjectId
  userId: Types.ObjectId
}

const reviewSchema = new Schema<IReview>({
  score: {
    type: Number,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

const ReviewModel: Model<IReview> = mongoose.model('Review', reviewSchema)

export default ReviewModel
