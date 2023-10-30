import { type Document, model, Schema } from 'mongoose'
import { type IUser, type IReview, Category, EventType, Barrio } from '../../types'

export interface IEvent extends Document {
  imgUrls: string[]
  description: string
  title: string
  place: string
  reviews?: IReview[]
  people?: IUser[]
  schedule: number
  duration: number
  category: Category
  price: number
  link: string
  minAge: number
  type: EventType
  creator: IUser
  days: string[]
  faqs: Array<{
    question: string
    answer: string
  }>
}

const eventSchema = new Schema<IEvent>({
  imgUrls: [{ type: String }],
  description: { type: String },
  title: { type: String },
  place: { type: String, enum: Object.values(Barrio) },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  people: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  schedule: { type: Number },
  duration: { type: Number },
  category: { type: String, enum: Object.values(Category) },
  price: { type: Number, default: 0 },
  link: { type: String, default: '' },
  minAge: { type: Number, default: 12 },
  type: { type: String, enum: Object.values(EventType) },
  days: [{ type: String }],
  faqs: [{
    question: { type: String },
    answer: { type: String }
  }]
})

export default model<IEvent>('Event', eventSchema)
