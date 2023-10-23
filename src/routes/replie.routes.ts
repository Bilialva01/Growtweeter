import { Router } from "express";
import { ReplieController } from "../controllers/replie.controller";
import authMiddleware from "../middlewares/auth.middleware";

export const replieRoutes = () => {
  const router = Router();
  const controller = new ReplieController();

  router.post("/", authMiddleware, controller.create);

  router.get("/", authMiddleware, controller.list);

  router.delete("/:idReplie", authMiddleware, controller.delete);
  router.put("/:idRepie", authMiddleware, controller.update);

  return router;
};
