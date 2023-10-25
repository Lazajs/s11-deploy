import { ZodError, z } from 'zod'

export function validateUser (data: unknown) {
  const validate = z.object({
    email: z.string().email(),
    name: z.string().min(4),
    password: z.string().min(8).max(32).regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,32}$/),
    birthdate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
  })

  try {
    validate.parse(data)
    return { error: false }
  } catch (err: unknown) {
    if (!(err instanceof ZodError)) throw err
    return { error: err.issues.map(issue => `${issue.message} in ${issue.path[0]}`) }
  }
}
