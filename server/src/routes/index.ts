import { Router } from 'express'
import { readdirSync } from 'fs'
import docs from './swagger'

const PATH_ROUTER = __dirname
const router = Router()

const cleanFileName = (fileName: string) => {
  const file = fileName.split('.').shift()
  return file
}

readdirSync(PATH_ROUTER).filter((fileName) => {
  const cleanName = cleanFileName(fileName)
  if (cleanName !== 'index' && cleanName !== 'swagger') {
    void import(`./${cleanName}.ts`).then((moduleRouter) => {
      router.use(`/api/v1/${cleanName}`, moduleRouter.router)
    })
  }
  return true
})

router.use('/api/v1/docs', docs)

export { router }
