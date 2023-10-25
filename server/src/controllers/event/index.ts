import { type Request, type Response } from 'express'
import { validateEvent } from '../validations/validateEvent'
import { EventModel } from '../../models/event'
import { type IEvent, type IUser } from '../../types'

export class EventController {
  static async newEvent (req: Request, res: Response) {
    const { error } = validateEvent(req.body)
    const { _id: id } = req.user as IUser

    if (error || !id) return res.status(400).json({ error })

    const result = await EventModel.create({ ...req.body, creator: id })

    if (result.error) return res.status(400).json({ error: result?.error })

    return res.status(201).json(result.event)
  }

  static async getEvents (req: Request, res: Response) {
    const result = await EventModel.getAll() // Filters here

    if (result?.error) return res.status(500).json({ error: result.error })

    return res.status(200).json(result.events)
  }

  static async getById (req: Request, res: Response) {
    const result = await EventModel.getById(req.params.id)

    if (result?.error) return res.status(404).json({ error: result.error })

    return res.status(200).json(result.event)
  }

  static async deleteEvent (req: Request, res: Response) {
    const { _id: id } = req.user as IUser
    const found = await EventModel.getById(req.params.id)
    if (found?.error) return res.status(404).json({ error: found.error })

    const { event } = found as unknown as { event: IEvent } // If there's no error, found is an IEvent
    if (!id || event.creator.toString() !== id) return res.status(401).json({ error: 'Unauthorized' })

    const result = await EventModel.deleteById(req.params.id)

    if (result?.error) return res.status(404).json({ error: result.error })

    return res.status(200).json(result.event)
  }

  static async updateEvent (req: Request, res: Response) {
    const { _id: id } = req.user as IUser
    const found = await EventModel.getById(req.params.id)
    if (found?.error) return res.status(404).json({ error: found.error })
    const { event } = found as unknown as { event: IEvent } // If there's no error, found is an IEvent
    if (!id || event.creator !== id) return res.status(401).json({ error: 'Unauthorized' })
    const { error } = validateEvent(req.body)
    if (error) return res.status(400).json({ error })

    const result = await EventModel.updateById(req.params.id, req.body)

    if (result?.error) return res.status(400).json({ error: result.error })

    return res.status(202).json(result.event)
  }
}
