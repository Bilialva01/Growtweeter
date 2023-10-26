import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { FollowerController } from "../controllers/followers.controller";

export const followerRoutes = () => {
  const router = Router();
  const controller = new FollowerController();

  router.get("/", authMiddleware, controller.listFollowers);
  return router;
};
