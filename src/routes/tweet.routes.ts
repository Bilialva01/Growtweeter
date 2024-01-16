import { Router } from "express";
import TweetController from "../controllers/tweet.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

export const tweetRoutes = () => {
  const router = Router();
  const controller = new TweetController();
  const authMiddleware = new AuthMiddleware();

  router.post("/", authMiddleware.checkUser, controller.create);
  router.get("/", authMiddleware.checkUser, controller.index);
  router.get("/", authMiddleware.checkUser, controller.list);
  router.put("/:idTweet", authMiddleware.checkUser, controller.update);
  router.delete("/:idTweet", authMiddleware.checkUser, controller.delete);

  return router;
};
