// routes/reviewRoutes.ts
import { Router } from "express";
import {
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/Review/reviewController";

const router = Router();

router.post("/", createReview);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

export { router };
