import mongoose from 'mongoose'

export default async function () {
  await mongoose.connect('mongodb://localhost:27017/express-mongo')
}
