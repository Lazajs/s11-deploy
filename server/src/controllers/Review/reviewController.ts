import { type Request, type Response } from 'express'
import ReviewModel from '../../db/models/Review'
import Event from '../../db/models/Event'
import User from '../../db/models/User'
import { type IUser } from '../../types'

export const createReview = async (req: Request, res: Response) => {
  try {
    const { score, text, eventId } = req.body
    const { _id } = req.user as IUser

    if (!req.user) {
      return res
        .status(401)
        .json({ error: 'No autorizado para crear una revisión.' })
    }

    const review = new ReviewModel({
      score,
      text,
      eventId,
      userId: _id
    })

    await review.save()

    res.status(201).json(review)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la revisión' })
  }
}

export const updateReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { score, text } = req.body
    const updatedReview = await ReviewModel.findByIdAndUpdate(
      id,
      { score, text },
      { new: true }
    )
    if (updatedReview) {
      res.status(200).json(updatedReview)
    } else {
      res.status(404).json({ error: 'La reseña no se encontró' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la reseña' })
  }
}

export const getReviewsByEventId = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params
    const reviews = await ReviewModel.find({ eventId })

    if (reviews.length > 0) {
      res.status(200).json(reviews)
    } else {
      res
        .status(404)
        .json({ error: 'No se encontraron reseñas para este evento' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las reseñas del evento' })
  }
}

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const revision = await ReviewModel.findById(id)

    if (!revision) {
      return res.status(404).json({ error: 'La revisión no se encontró' })
    }

    await Event.updateOne(
      { _id: revision.eventId },
      { $pull: { reviews: id } }
    )

    await User.updateOne({ _id: revision.userId }, { $pull: { reviews: id } })

    await ReviewModel.deleteOne({ _id: id })

    return res.json({ message: 'Review eliminada con éxito' })
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar la review' })
  }
}
