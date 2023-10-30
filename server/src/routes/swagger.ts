import express from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import path from 'path'

const swaggerYaml = path.resolve(__dirname, '../../', 'swagger.yaml')

const options: swaggerJsdoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Buenos Aires Explora API',
      version: '1.0.0'
    }
  },
  apis: [swaggerYaml]
}

const swaggerSpec = swaggerJsdoc(options)

const router = express.Router()

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default router
