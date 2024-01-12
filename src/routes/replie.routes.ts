import { Router } from "express";
import { ReplieController } from "../controllers/replie.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

export const replieRoutes = () => {
  const router = Router();
  const controller = new ReplieController();
  const authMiddleware = new AuthMiddleware();

  router.post("replies/", authMiddleware.checkUser, controller.create);

  router.get("replies/", authMiddleware.checkUser, controller.list);

  router.delete(
    "replies/:idReplie",
    authMiddleware.checkUser,
    controller.delete
  );
  router.put("replies/:idRepie", authMiddleware.checkUser, controller.update);

  return router;
};
