import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import connect from './db/connect'
import auth from './routes/auth'

config()
const app = express()
app.disable('x-powered-by')
app.use(cors())
app.use(express.json())

app.use('/api/auth', auth)

const { PORT } = process.env
const port = PORT ?? 3001

// connect().then(() => {
//   console.log('Connected to MongoDB')
// }).catch((err) => {
//   console.log(err)
// })

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
