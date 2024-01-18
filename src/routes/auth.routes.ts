import { Router } from "express";
import userPasswordMiddleware from "../middlewares/user.password.middeware";
import AuthController from "../controllers/auth.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

export const authRoutes = () => {
  const router = Router();
  const controller = new AuthController();
  const authMiddleware = new AuthMiddleware();

  router.post("/login", userPasswordMiddleware, controller.login);
  router.get("/logout", authMiddleware.checkUser, controller.logout);
  return router;
};
