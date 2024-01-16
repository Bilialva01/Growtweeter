import { Router } from "express";
import { FollowerController } from "../controllers/followers.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

export const followerRoutes = () => {
  const router = Router();
  const controller = new FollowerController();
  const authMiddleware = new AuthMiddleware();

  router.get("/", authMiddleware.checkUser, controller.listFollowers);
  return router;
};
