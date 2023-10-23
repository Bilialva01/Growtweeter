import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import userPasswordMiddleware from "../middlewares/user.password.middeware";
import authMiddleware from "../middlewares/auth.middleware";

export const userRoutes = () => {
  const router = Router();
  const controller = new UserController();

  router.post("/", userPasswordMiddleware, controller.create);

  router.get("/", authMiddleware, controller.list);
  router.delete("/:id", authMiddleware, controller.delete);
  router.put("/:id", authMiddleware, controller.update);

  return router;
};
