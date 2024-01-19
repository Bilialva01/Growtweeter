import { Router } from "express";
import { LikeController } from "../controllers/like.controller";
import AuthMiddleware from "../middlewares/auth.middleware";


export const likeRoutes = () => {
  const router = Router();
  const controller = new LikeController();
  const authMiddleware = new AuthMiddleware();
 

  router.post("/", authMiddleware.checkUser, controller.create);
  router.delete("/:idLike", authMiddleware.checkUser, controller.delete);

  return router;
};
