import { Request, Response, Router } from "express";

import { userController } from "../controllers/user.controller";
import { userMiddleware } from "../middlewares/user.middleware";

const router = Router();

export const userRouter = router;

router.get("/", userController.getAll);

router.get("/:userId", userMiddleware.getByIdAndThrow, userController.getById);

router.post("/", userController.create);

router.put("/:userId", userController.update);

router.delete("/:userId", userController.delete);

router.get("/welcome", (req: Request, res: Response) => {
  res.send("WELCOME");
});
