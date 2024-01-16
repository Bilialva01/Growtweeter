import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

export const userRoutes = () => {
  const router = Router();
  const controller = new UserController();
  const authMiddleware = new AuthMiddleware();

  router.post("/", controller.create);

  router.get("/", authMiddleware.checkUser, controller.list);
  router.put("/:id", authMiddleware.checkUser, controller.update);
  router.delete("/:id", authMiddleware.checkUser, controller.delete);

  return router;
};
