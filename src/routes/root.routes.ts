import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  return res.status(200).send({ success: true, message: "API - Growtwitter" });
});

export default router;
