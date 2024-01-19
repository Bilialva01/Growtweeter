import { Router } from "express";
import { ReplyController } from "../controllers/reply.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

export const replyRoutes = () => {
  const router = Router();
  const controller = new ReplyController();
  const authMiddleware = new AuthMiddleware();

  router.post("/", authMiddleware.checkUser, controller.create);

  router.get("/", authMiddleware.checkUser, controller.list);

  router.delete("/:idReply", authMiddleware.checkUser, controller.delete);
  router.put("/:idReply", authMiddleware.checkUser, controller.update);

  return router;
};
