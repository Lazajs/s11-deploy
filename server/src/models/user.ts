import User from '../db/models/User'
import bcrypt from 'bcryptjs'
import { type IUser } from '../types'
import jwt from 'jsonwebtoken'

export class UserModel {
  static async register ({ email, name, password, birthdate, image }: Partial<IUser> & { password: string }) {
    try {
      const foundName = await User.findOne({ name })
      const foundMail = await User.findOne({ email })
      if (foundName || foundMail) return { error: 'Este nombre de usuario o correo electrónico está en uso.' }

      const passwordHash = password && await bcrypt.hash(password, 10)

      const user = new User({
        email,
        name,
        passwordHash,
        birthdate,
        image
      })

      const newUser = await user.save()

      const data = await newUser.toJSON()
      const token = jwt.sign(data, process.env.JWT_SECRET as string, {
        expiresIn: '1d'
      })

      return { ...data, token }
    } catch (err) {
      return { error: err }
    }
  }

  static async login ({ email, password }: { email: string, password: string }) {
    try {
      const found = await User.findOne({ email })
      if (!found) return { error: 'Usuario no encontrado.' }

      const passwordMatch = await bcrypt.compare(password, found.passwordHash)
      if (!passwordMatch) return { error: 'Contraseña incorrecta.' }

      const data = await found.populate('ownEvents').populate('nextEvents').populate('reviews').toJSON()

      console.log(data)
      const token = jwt.sign(data, process.env.JWT_SECRET as string, {
        expiresIn: '1d'
      })

      return { ...data, token }
    } catch (err) {
      return { error: err }
    }
  }
}
