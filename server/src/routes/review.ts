// routes/reviewRoutes.ts
import { Router } from 'express'
import {
  createReview,
  updateReview,
  deleteReview,
  getReviewsByEventId
} from '../controllers/Review/reviewController'
import validateToken from '../middlewares/validateToken'
import populateUser from '../middlewares/populateUser'

const router = Router()

router.post('/', validateToken, populateUser, createReview)
router.put('/:id', validateToken, populateUser, updateReview)
router.delete('/:id', validateToken, populateUser, deleteReview)
router.get('/:eventId', getReviewsByEventId)

export { router }
