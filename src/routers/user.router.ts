import { Request, Response, Router } from "express";

import { userController } from "../controllers";
import { authMiddleware, userMiddleware } from "../middlewares";

const router = Router();

export const userRouter = router;

router.get("/", userController.getAll);

router.get(
  "/:userId",
  authMiddleware.checkAccessToken,
  userMiddleware.isIdValid,
  userMiddleware.getByIdOrThrow,
  userController.getById
);

router.put(
  "/:userId",
  authMiddleware.checkAccessToken,
  userMiddleware.isIdValid,
  userMiddleware.getByIdOrThrow,
  userMiddleware.isValidUpdate,
  userController.update
);

router.delete(
  "/:userId",
  authMiddleware.checkAccessToken,
  userMiddleware.isIdValid,
  userMiddleware.getByIdOrThrow,
  userController.delete
);

router.get("/welcome", (req: Request, res: Response) => {
  res.send("WELCOME");
});
