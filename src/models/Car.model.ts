import { model, Schema, Types } from "mongoose";

import { User } from "./User.model";

//Schema - описуємо поля які будуть в схемі БД
//model - модель дає зручні методи для використання, називається з великої букви

const carSchema = new Schema(
  {
    brand: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    model: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Car = model("car", carSchema);
