import { type IEvent } from '../types'
import Event from '../db/models/Event'
import User from '../db/models/User'

export class EventModel {
  static async create (event: IEvent) {
    try {
      const newEvent = new Event(event)
      const eventFromDb = await newEvent.save()

      const creator = await User.findById(event.creator)
      if (!creator) return { error: 'User not found' }

      creator.ownEvents.push(eventFromDb._id)
      await creator.save()

      return { event: eventFromDb, error: false }
    } catch (err) {
      console.log(err)
      return { error: err }
    }
  }

  static async getAll(filters = {}) {
    try {
      const events = await Event.find(filters)
  
      return { events, error: false }
    } catch (e) {
      return { error: e }
    }
  }

  static async getById (id: string) {
    try {
      const event = await Event.findById(id)
      if (!event) return { error: 'Event not found' }
      return { event, error: false }
    } catch (e) {
      return { error: e }
    }
  }

  static async deleteById (id: string) {
    try {
      const event = await Event.findByIdAndDelete(id)
      if (!event) return { error: 'Event not found' }
      const creator = await User.findById(event.creator)
      if (!creator) return { error: 'User not found' }
      creator.ownEvents = creator.ownEvents.filter((e: string) => e !== id)
      await creator.save()

      return { event, error: false }
    } catch (e) {
      return { error: e }
    }
  }

  static async updateById (id: string, update: Partial<IEvent>) {
    try {
      const updatedEvent = await Event.findByIdAndUpdate(id, update, { new: true })

      if (!updatedEvent) return { error: 'Event not found' }

      return { event: updatedEvent, error: false }
    } catch (e) {
      return { error: e }
    }
  }
}
