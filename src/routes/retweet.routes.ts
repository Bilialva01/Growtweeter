import { Router } from "express";
import RetweetController from "../controllers/retweet.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

export const retweetRoutes = () => {
  const router = Router();
  const controller = new RetweetController();
  const authMiddleware = new AuthMiddleware();

  router.post("/", authMiddleware.checkUser, controller.create);
  router.get("/", authMiddleware.checkUser, controller.index);
  router.get("/", authMiddleware.checkUser, controller.list);
  router.put("/:idRetweet", authMiddleware.checkUser, controller.update);
  router.delete("/:idRetweet", authMiddleware.checkUser, controller.delete);

  return router;
};
