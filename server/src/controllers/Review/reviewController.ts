import { Request, Response } from "express";
import ReviewModel from "../../db/models/Review";

export const createReview = async (req: Request, res: Response) => {
  try {
    const { eventId, organizerId, score, text } = req.body;
    const newReview = new ReviewModel({ eventId, organizerId, score, text });
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la reseña" });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { score, text } = req.body;
    const updatedReview = await ReviewModel.findByIdAndUpdate(
      id,
      { score, text },
      { new: true }
    );
    if (updatedReview) {
      res.status(200).json(updatedReview);
    } else {
      res.status(404).json({ error: "La reseña no se encontró" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la reseña" });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedReview = await ReviewModel.findByIdAndDelete(id);
    if (deletedReview) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "La reseña no se encontró" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la reseña" });
  }
};
