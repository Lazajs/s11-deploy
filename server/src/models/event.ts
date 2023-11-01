import { IEvent } from '../types';
import Event from '../db/models/Event';
import User from '../db/models/User';

export class EventModel {
  static async create(event: IEvent) {
    try {
      const newEvent = new Event(event);
      const eventFromDb = await newEvent.save();

      const creator = await User.findById(event.creator);
      if (!creator) return { error: 'User not found' };

      creator.ownEvents.push(eventFromDb._id);
      await creator.save();

      return { event: eventFromDb, error: false };
    } catch (err) {
      console.error(err);
      return { error: err };
    }
  }

  static async getAll(filters: Record<string, any> = {}) {
    try {
      const query: Record<string, any> = {};

      for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
          const filterValue = filters[key];
          const intValue = parseInt(filterValue, 10);

          switch (key) {
            case 'category':
            case 'place':
            case 'type':
              if (Array.isArray(filterValue)) {
                query[key] = { $in: filterValue };
              } else {
                query[key] = filterValue;
              }
              break;

            case 'price':
              if (!isNaN(intValue)) {
                if (intValue === 0) {
                  query[key] = 0;
                } else {
                  query[key] = { $gte: intValue };
                }
              }
              break;

            case 'minAge':
              if (!isNaN(intValue)) {
                query[key] = { $gte: intValue };
              }
              break;
          }
        }
      }

      const events = await Event.find(query);

      return { events, error: false };
    } catch (e) {
      return { error: e };
    }
  }

  static async getById(id: string) {
    try {
      const event = await Event.findById(id);
      if (!event) return { error: 'Event not found' };
      return { event, error: false };
    } catch (e) {
      return { error: e };
    }
  }

  static async deleteById(id: string) {
    try {
      const event = await Event.findByIdAndDelete(id);
      if (!event) return { error: 'Event not found' };
      const creator = await User.findById(event.creator);
      if (!creator) return { error: 'User not found' };
      creator.ownEvents = creator.ownEvents.filter((e: string) => e !== id);
      await creator.save();

      return { event, error: false };
    } catch (e) {
      return { error: e };
    }
  }

  static async updateById(id: string, update: Partial<IEvent>) {
    try {
      const updatedEvent = await Event.findByIdAndUpdate(id, update, { new: true });

      if (!updatedEvent) return { error: 'Event not found' };

      return { event: updatedEvent, error: false };
    } catch (e) {
      return { error: e };
    }
  }
}
