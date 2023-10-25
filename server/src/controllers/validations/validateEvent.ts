import { ZodError, z } from 'zod'

export function validateEvent (data: unknown) {
  const validate = z.object({
    imgUrls: z.array(z.string()),
    description: z.string().min(10).max(250),
    title: z.string().min(4).max(50),
    place: z.string().min(4).max(50),
    schedule: z.number().min(0).max(25),
    duration: z.number().min(0).max(24),
    reviews: z.array(z.string()).optional(),
    people: z.array(z.string()).optional(),
    category: z.enum(['Gastronómicos', 'Culturales', 'Deportivos', 'Educativos', 'Sociales y de entretenimiento', 'Beneficios y causas benéficas', 'Familiares y niños', 'Moda y belleza', 'Conferencias y convenciones']),
    price: z.number().min(0),
    link: z.string().optional(),
    minAge: z.number().min(0).max(100).optional(),
    type: z.enum(['Interior', 'Exterior', 'Virtual']),
    days: z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/))
  })

  try {
    validate.parse(data)
    return { error: false }
  } catch (err: unknown) {
    if (!(err instanceof ZodError)) throw err
    return { error: err.issues.map(issue => `${issue.message} in ${issue.path[0]}`) }
  }
}
