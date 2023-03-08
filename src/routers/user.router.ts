import { Request, Response, Router } from "express";

import { userController } from "../controllers/user.controller";
import { userMiddleware } from "../middlewares/user.middleware";

const router = Router();

export const userRouter = router;

router.get("/", userController.getAll);

router.post("/", userMiddleware.isUserValidCreate, userController.create);

router.get("/:userId", userMiddleware.getByIdAndThrow, userController.getById);

router.put("/:userId", userController.update);

router.delete("/:userId", userController.delete);

router.get("/welcome", (req: Request, res: Response) => {
  res.send("WELCOME");
});
