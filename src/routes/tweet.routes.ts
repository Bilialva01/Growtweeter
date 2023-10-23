import { Router } from "express";
import { TweetController } from "../controllers/tweet.controller";
import authMiddleware from "../middlewares/auth.middleware";

export const tweetRoutes = () => {
  const router = Router();
  const controller = new TweetController();

  router.post("/", authMiddleware, controller.create);

  router.get("/", authMiddleware, controller.list);

  router.delete("/:idTweet", authMiddleware, controller.delete);
  router.put("/:idTweet", authMiddleware, controller.update);

  return router;
};
