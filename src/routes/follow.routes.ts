import { Router } from "express";
import { FollowController } from "../controllers/follow.controller";

export const followRoutes = () => {
  const router = Router();
  const controller = new FollowController();
};
