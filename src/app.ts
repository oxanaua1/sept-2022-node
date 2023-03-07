import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { configs } from "./configs/config";
import { IError } from "./models/types/commom.types";
import { userRouter } from "./routers/user.router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

//--Error Handler

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status;

  return res.status(status).json({
    message: err.message,
    status,
  });
});

app.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL);
  console.log(`Server has started on PORT ${configs.PORT} 🚀🚀🚀`);
});
