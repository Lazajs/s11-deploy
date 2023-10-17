import 'dotenv/config'

export const PORT = +(process.env.PORT ?? 3001)
export const MONGOOSE_URI = process.env.MONGOOSE_URI as string // MONGODB
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string // google Api
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string // google Api
