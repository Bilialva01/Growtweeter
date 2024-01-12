import { Router } from "express";
import { LikeController } from "../controllers/like.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

export const likeRoutes = () => {
  const router = Router();
  const controller = new LikeController();
  const authMiddleware = new AuthMiddleware();

  router.post("likes/", authMiddleware.checkUser, controller.create);

  router.get("likes/", authMiddleware.checkUser, controller.list);

  router.delete("likes/:idLike", authMiddleware.checkUser, controller.delete);
  router.put("likes/:idLike", authMiddleware.checkUser, controller.update);

  return router;
};
