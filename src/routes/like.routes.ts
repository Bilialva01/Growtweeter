import { Router } from "express";
import { LikeController } from "../controllers/like.controller";
import authMiddleware from "../middlewares/auth.middleware";

export const likeRoutes = () => {
  const router = Router();
  const controller = new LikeController();

  router.post("/", authMiddleware, controller.create);

  router.get("/", authMiddleware, controller.list);

  router.delete("/:idLike", authMiddleware, controller.delete);
  router.put("/:idLike", authMiddleware, controller.update);

  return router;
};
