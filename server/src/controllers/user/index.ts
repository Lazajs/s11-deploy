import { type Request, type Response } from 'express'
import { validateUser } from '../validations/validateUser'
import { UserModel } from '../../models/user'
import { type IUser } from '../../types'

export class UserController {
  static async update (req: Request, res: Response) {
    const { email, name, password, birthdate, image } = req.body
    const { _id } = req.user as IUser
    const { error } = validateUser(req.body)

    if (error) {
      res.status(400).json({ error })
    } else if (!_id) res.status(401).json({ error: 'No estás autorizado para realizar esta acción.' })

    const result = await UserModel.update({ image, email, name, password, birthdate, _id })

    if (result?.error) {
      return res.status(400).json(result.error)
    }

    return res.status(202).json(result.user)
  }

  static async getById (req: Request, res: Response) {
    const { id } = req.params
    if (!id) return res.status(400).json({ error: 'No se ha proporcionado un ID.' })
    const result = await UserModel.getById(id)

    if (result?.error) {
      return res.status(400).json(result.error)
    }

    return res.status(200).json(result.user)
  }
}
