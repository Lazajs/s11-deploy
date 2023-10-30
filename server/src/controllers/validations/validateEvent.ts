import { ZodError, z } from 'zod'
import { Category, EventType, Barrio } from '../../types'

export function validateEvent (data: unknown) {
  const validate = z.object({
    imgUrls: z.array(z.string()),
    description: z.string().min(10).max(250),
    title: z.string().min(4).max(50),
    place: z.nativeEnum(Barrio),
    schedule: z.number().min(0).max(25),
    duration: z.number().min(0).max(24),
    reviews: z.array(z.string()).optional(),
    people: z.array(z.string()).optional(),
    category: z.nativeEnum(Category),
    price: z.number().min(0),
    link: z.string().optional(),
    minAge: z.number().min(0).max(100).optional(),
    type: z.nativeEnum(EventType),
    days: z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
    faqs: z.array(z.object({
      question: z.string().min(4).max(50),
      answer: z.string().min(4).max(250)
    })).optional().default([])
  })

  try {
    validate.parse(data)
    return { error: false }
  } catch (err: unknown) {
    if (!(err instanceof ZodError)) throw err
    return { error: err.issues.map(issue => `${issue.message} in ${issue.path[0]}`) }
  }
}
