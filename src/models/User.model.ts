import { model, Schema } from "mongoose";

import { EGenders, EUserStatus } from "../enums";
import { IUser, IUserModel } from "../types";

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
    age: {
      type: "Number",
      required: false,
    },
    status: {
      type: "String",
      enum: EUserStatus,
      default: EUserStatus.inactive,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.virtual("nameWithSurname").get(function () {
  return `${this.name} Piatov`;
});

userSchema.methods = {
  // method - for user -one для конкретного юзера створюємо метод, напр дописуємо прізвище йому
  nameWithAge() {
    return `${this.name} is ${this.age} years old.`;
  },
};

userSchema.statics = {
  // static - for User-all до моделі створюємо свій метод
  async findByName(name: string): Promise<IUser[]> {
    return this.find({ name });
  },
};

export const User = model<IUser, IUserModel>("user", userSchema);
