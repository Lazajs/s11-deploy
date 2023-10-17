import jwt from 'jsonwebtoken'

export default function validateToken (req: any, res: any, next: any) {
  const token = req.headers.session
  if (!token) return res.status(401).json({ error: 'No se encontró un token.' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido.' })
  }
}
