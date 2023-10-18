import { type Document } from "mongoose";

export interface DatabaseUser extends Document {
  email: string;
  name: string;
  passwordHash: string;
  nextEvents: unknown[]; // TODO
  reviews: unknown[]; // TODO
  ownEvents: unknown[]; // TODO
  rating: number;
  image: string;
  birthdate: string;
  googleId: string;
}

export interface IUser {
  email: string;
  name: string;
  password: string;
  birthdate: string;
  image: string;
  nextEvents?: unknown[]; // TODO
  reviews?: unknown[]; // TODO
  ownEvents?: unknown[]; // TODO
  rating?: number;
  googleId?: string;
}
