import express from 'express'

const app = express()
app.disable('x-powered-by')
app.use(express.json())

app.get('/api/example', (req, res) => {
  const data = { message: 'Hello, API!' }
  res.status(200).json(data)
})

const port = process.env.PORT ?? 3001
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
