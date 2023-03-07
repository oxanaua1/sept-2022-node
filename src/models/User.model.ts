import { model, Schema } from "mongoose";

import { EGenders } from "./types/user.types";

//Schema - описуємо поля які будуть в схемі БД
//model - модель дає зручні методи для використання, називається з великої букви

const userSchema = new Schema(
  {
    name: {
      type: "String",
    },
    email: {
      type: "String",
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: "String",
      required: [true, "password is required"],
    },
    gender: {
      type: "String",
      enum: EGenders,
    },
  },
  {
    versionKey: false,
  }
);

export const User = model("user", userSchema);
