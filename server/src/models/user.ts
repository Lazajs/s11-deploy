import User from '../db/models/User'
import bcrypt from 'bcryptjs'
import { type IUser } from '../types'
import jwt from 'jsonwebtoken'

export class UserModel {
  static async register (userData: Partial<IUser> & { password: string }) {
    try {
      const { email, name, password } = userData
      const foundName = await User.findOne({ name })
      const foundMail = await User.findOne({ email })
      if (foundName || foundMail) return { error: 'Este nombre de usuario o correo electrónico está en uso.' }

      const passwordHash = password && (await bcrypt.hash(password, 10))

      const user = new User({
        ...userData,
        passwordHash
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

      const data = await found
        .populate('ownEvents')
        .populate('nextEvents')
        .populate('reviews')
        .toJSON()

      const token = jwt.sign(data, process.env.JWT_SECRET as string, {
        expiresIn: '1d'
      })

      return { ...data, token }
    } catch (err) {
      return { error: err }
    }
  }

  static async update (newUser: Partial<IUser> & { password: string }) {
    try {
      const { email, name, password, birthdate, image, _id: id, interests } = newUser
      const found = await User.findById(id)
      if (!found) return { error: 'Usuario no encontrado.' }

      const passwordHash = password && (await bcrypt.hash(password, 10))

      found.email = email ?? found.email
      found.name = name ?? found.name
      found.passwordHash = passwordHash ?? found.passwordHash
      found.birthdate = birthdate ?? found.birthdate
      found.image = image ?? found.image
      found.interests = interests ?? found.interests

      const updatedUser = await found.save()

      const data = await updatedUser
        .populate('ownEvents')
        .populate('nextEvents')
        .populate('reviews')
        .toJSON()

      return { user: data }
    } catch (err) {
      return { error: err }
    }
  }

  static async getById (id: string) {
    try {
      const found = await User.findById(id)
      if (!found) return { error: 'Usuario no encontrado.' }

      const data = await found
        .populate('ownEvents')
        .populate('nextEvents')
        .populate('reviews')
        .toJSON()

      return { user: data }
    } catch (err) {
      return { error: err }
    }
  }

  static async google (user: IUser) {
    try {
      const found = await User.findOne(user)
      if (!found) return { error: 'Usuario no encontrado.' }

      const data = await found
        .populate('ownEvents')
        .populate('nextEvents')
        .populate('reviews')
        .toJSON()

      const token = jwt.sign(data, process.env.JWT_SECRET as string, {
        expiresIn: '1d'
      })

      return { ...data, token }
    } catch (error) {
      return { error }
    }
  }
}
