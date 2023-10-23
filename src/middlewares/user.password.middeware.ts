import { NextFunction, Request, Response } from "express";

async function userPasswordMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(401).send({
      ok: false,
      message: "Incorrect username and/or password",
    });
  }
  next();
}
export default userPasswordMiddleware;
