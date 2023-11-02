import jwt from 'jsonwebtoken'
import { type Request, type Response, type NextFunction } from 'express'

export default function validateToken (req: Request, res: Response, next: NextFunction) {
  const { session: token } = req.cookies
  if (!token) return res.status(401).json({ error: 'No se encontró un token.' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido.' })
  }
}
