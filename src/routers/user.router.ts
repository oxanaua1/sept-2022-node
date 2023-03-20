import { Request, Response, Router } from "express";

import { userController } from "../controllers";
import {
  authMiddleware,
  commonMiddleware,
  userMiddleware,
} from "../middlewares";
import { UserValidator } from "../validators";

const router = Router();

export const userRouter = router;

router.get("/", userController.getAll);

router.get(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  userMiddleware.getByIdOrThrow,
  userController.getById
);

router.put(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  userMiddleware.getByIdOrThrow,
  commonMiddleware.isBodyValid(UserValidator.updateUser),
  userController.update
);

router.delete(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  userMiddleware.getByIdOrThrow,
  userController.delete
);

router.get("/welcome", (req: Request, res: Response) => {
  res.send("WELCOME");
});
