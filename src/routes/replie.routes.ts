import { Router } from "express";
import { ReplieController } from "../controllers/replie.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

export const replieRoutes = () => {
  const router = Router();
  const controller = new ReplieController();
  const authMiddleware = new AuthMiddleware();

  router.post("/", authMiddleware.checkUser, controller.create);

  router.get("/", authMiddleware.checkUser, controller.list);

  router.delete("/:idReplie", authMiddleware.checkUser, controller.delete);
  router.put("/:idRepie", authMiddleware.checkUser, controller.update);

  return router;
};
