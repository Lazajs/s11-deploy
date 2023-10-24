import { type Request, type Response, type NextFunction } from 'express'
import User from '../db/models/User'
import { type IUser } from '../types'

export default async function populateUser (req: Request, res: Response, next: NextFunction) {
  const user = req?.user as IUser
  if (!user) return res.status(401).json({ error: 'No se encontró un usuario.' })

  try {
    const found = await User.findById(user._id).populate('ownEvents').populate('nextEvents').populate('reviews').lean()

    if (!found) return res.status(404).json({ error: 'No se encontró un usuario.' })

    req.user = found
    next()
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: err })
  }
}
