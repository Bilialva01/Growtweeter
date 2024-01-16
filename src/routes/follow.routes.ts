import { Router } from "express";
import { FollowController } from "../controllers/follow.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

export const followRoutes = () => {
  const router = Router();
  const controller = new FollowController();
  const authMiddleware = new AuthMiddleware();

  router.post("/", authMiddleware.checkUser, controller.followUser);
  router.delete("/:idUser", authMiddleware.checkUser, controller.unfollowUser);

  return router;
};
