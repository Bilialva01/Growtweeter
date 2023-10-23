import { Router } from "express";
import userPasswordMiddleware from "../middlewares/user.password.middeware";
import AuthController from "../controllers/auth.controller";

export const authRoutes = () => {
  const router = Router();
  const controller = new AuthController();

  router.post("/login", userPasswordMiddleware, controller.create);
  router.get("/logout", controller.delete);
  return router;
};
