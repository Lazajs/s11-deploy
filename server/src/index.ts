import express from 'express'
import http from 'http'
import cors from 'cors'
import passport from 'passport'
import session from 'express-session'
import { PORT } from './utils/config'
import connect from './db/connect'
import { router } from './routes'
import { configureSocketIO } from './sockets/socket'
import cookieParser from 'cookie-parser'
import './utils/passport'

const app = express()
app.disable('x-powered-by')

const databaseURI = process.env.MONGOOSE_URI
const frontEndURL = process.env.FRONT_END_URL ?? 'http://localhost:3000'

if (!databaseURI || !frontEndURL) {
  throw new Error(
    'MONGOOSE_URI/FRONT_END_URL environment variable are not set.'
  )
}

const corsOptions: cors.CorsOptions = {
  origin: frontEndURL,
  methods: 'GET,POST,PUT,DELETE,PATCH',
  credentials: true
}

app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json())

const httpServer = http.createServer(app)

configureSocketIO(httpServer)

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: !!process.env.PRODUCTION, // Utilizar sólo en producción true
      maxAge: 24 * 60 * 60 * 1000 // Tiempo de vida de la cookie en milisegundos (24 horas en este caso)
    }
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.use(router)

const start = async () => {
  try {
    await connect(databaseURI)

    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
      console.log(
        `Docs available at http://localhost:${PORT ?? 3001}/api/v1/docs`
      )
    })
  } catch (error) {
    console.log(error)
  }
}

start().catch(console.error)
