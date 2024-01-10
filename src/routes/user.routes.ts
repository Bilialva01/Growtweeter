import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import userPasswordMiddleware from "../middlewares/user.password.middeware";
import AuthMiddleware from "../middlewares/auth.middleware";

export const userRoutes = () => {
  const router = Router();
  const controller = new UserController();
  const authMiddleware = new AuthMiddleware();

  router.post("/users", userPasswordMiddleware, controller.create);

  router.get("/users", authMiddleware.checkUser, controller.list);
  router.put("users/:id", authMiddleware.checkUser, controller.update);
  router.delete("users/:id", authMiddleware.checkUser, controller.delete);

  return router;
};
