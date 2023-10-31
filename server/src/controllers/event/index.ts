import { type Request, type Response } from 'express'
import { validateEvent } from '../validations/validateEvent'
import { EventModel } from '../../models/event'
import { type IEvent, type IUser } from '../../types'

type QueryParameters = {
  [key: string]: string | undefined
}

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
    
    const filters: QueryParameters = {
      place: req.query.place as string ?? undefined,
      price: req.query.price as string ?? undefined,
      minAge: req.query.minAge as string ?? undefined,
      location: req.query.location as string ?? undefined
    }

    const cleanedFilters: QueryParameters = Object.keys(filters).reduce((acc, key) => {
      if (filters[key] !== undefined) {
        acc[key] = filters[key]
      }
      return acc
    }, {} as QueryParameters)

    let result

    if (Object.keys(cleanedFilters).length === 0) {
      result = await EventModel.getAll()
    } else {
      result = await EventModel.getAll(cleanedFilters)
    }

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
