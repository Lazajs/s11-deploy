import { type Request, type Response } from "express";
import ReviewModel from "../../db/models/Review";
import Event from "../../db/models/Review";
import User from "../../db/models/Review";
import { IUser } from "../../types";

export const createReview = async (req: Request, res: Response) => {
  try {
    const { score, text, eventId } = req.body;
    const { _id } = req.user as IUser;

    if (!req.user) {
      return res
        .status(401)
        .json({ error: "No autorizado para crear una revisión." });
    }

    const review = new ReviewModel({
      score,
      text,
      eventId,
      userId: _id,
    });

    await review.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la revisión" });
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

// borrar en todos los modelos
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
