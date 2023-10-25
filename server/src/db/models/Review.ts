import mongoose, { type Document, Schema, type Model } from 'mongoose'

export interface IReview extends Document {
  score: number
  text: string
  eventId?: string
  organizerId?: string
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
  organizerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

const ReviewModel: Model<IReview> = mongoose.model('Review', reviewSchema)

export default ReviewModel
