import { Router } from "express";
import { FollowController } from "../controllers/follow.controller";
import authMiddleware from "../middlewares/auth.middleware";

export const followRoutes = () => {
  const router = Router();
  const controller = new FollowController();

  router.post("/", authMiddleware, controller.followUser);
  router.delete("/:idUser", authMiddleware, controller.unfollowUser);

  router.get("/", authMiddleware, controller.listFollowers);
  router.get("/", authMiddleware, controller.listFollowings);

  return router;
};
