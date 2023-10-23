import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const  token  = req.headers.authorization

    if (!token) {
      return res.status(401).send({
        message: "Authentication token fail",
      });
    }

    const user = await userService.getByToken(token as string);

    if (!user) {
      return res.status(401).send({
        message: "Authentication token fail",
      });
    }
    req.body.idUser = user.id;

    next();
  } catch (error) {
    return res.status(500).send({
      message: error,
    });
  }
}

export default authMiddleware;
