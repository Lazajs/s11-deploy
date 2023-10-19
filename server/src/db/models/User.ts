import mongoose from "mongoose";
import { type DatabaseUser } from "../../types";

const userSchema = new mongoose.Schema<DatabaseUser>({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  nextEvents: {
    type: Array, // ObjectId
    required: true,
    default: [],
  },
  reviews: {
    type: Array, // ObjectId
    required: true,
    default: [],
  },
  ownEvents: {
    type: Array, // ObjectId
    required: true,
    default: [],
  },
  passwordHash: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  image: {
    type: String,
    required: true,
    default:
      "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
  },
  birthdate: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
  },
});

export default mongoose.models.User ||
  mongoose.model<DatabaseUser>("User", userSchema);
