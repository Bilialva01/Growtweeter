import { Router } from "express";
import TweetController from "../controllers/tweet.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

export const tweetRoutes = () => {
  const router = Router();
  const controller = new TweetController();
  const authMiddleware = new AuthMiddleware();

  router.post("/tweets", authMiddleware.checkUser, controller.create);
  router.get("/tweetss", authMiddleware.checkUser, controller.index);
  router.get("/tweets", authMiddleware.checkUser, controller.list);
  router.put("tweets/:idTweet", authMiddleware.checkUser, controller.update);
  router.delete("tweets/:idTweet", authMiddleware.checkUser, controller.delete);

  return router;
};
