import mongoose from 'mongoose'

const connect = async (url: string) => {
  try {
    await mongoose.connect(url)
    console.log('Connected to the database')
  } catch (error) {
    console.error('Database connection error:', error)
  }
}

export default connect
