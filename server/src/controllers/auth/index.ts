import { type Request, type Response } from 'express'
import { UserModel } from '../../models/user'
import { validateUser } from '../validations/validateUser'
import { type IUser } from '../../types'

interface AuthenticatedRequest extends Request {
  user?: {
    passwordHash?: string
    // other user properties
  }
}

export class AuthController {
  static async signup (req: Request, res: Response) {
    const { error } = validateUser(req.body)

    if (error) {
      res.status(400).json({ error })
      return
    }

    const result = await UserModel.register(req.body)

    if (result?.error) {
      res.status(400).json(result.error)
      return
    }

    res.cookie('session', result.token, { httpOnly: true })

    delete result.token
    delete result.passwordHash

    res.status(201).json(result)
  }

  static async signin (req: Request, res: Response) {
    const { email, password } = req.body

    const result = await UserModel.login({ email, password })

    if (result?.error) {
      res.status(401).json(result.error)
      return
    }

    res.cookie('session', result.token, { httpOnly: true })

    delete result.token
    delete result.passwordHash
    res.status(200).json(result)
  }

  static async logout (req: Request, res: Response) {
    res.clearCookie('session').status(200).json({ message: 'Sesión cerrada.' })
  }

  static async me (req: AuthenticatedRequest, res: Response) {
    const { user } = req
    if (user) {
      const { passwordHash, ...userWithoutPassword } = user
      res.status(200).json(userWithoutPassword)
    } else {
      res.status(401).json({ error: 'No autorizado.' })
    }
  }

  static async google (req: Request, res: Response) {
    try {
      const user = req.user
      const result = await UserModel.google(user as IUser)

      if (result?.error) {
        res.status(400).json(result.error)
        return
      }

      res.cookie('session', result.token, { httpOnly: true })
      delete result.token

      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}
