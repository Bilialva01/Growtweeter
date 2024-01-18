import { NextFunction, Request, Response } from "express";
import jwtService from "../services/jwt.service";

interface UserPayload {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  avatar: string;
  enable: boolean;
  iat: number;
}
class AuthMiddleware {
  static checkUser(
    arg0: string,
    checkUser: any,
    logout: (
      req: Request<
        import("express-serve-static-core").ParamsDictionary,
        any,
        any,
        import("qs").ParsedQs,
        Record<string, any>
      >,
      res: Response<any, Record<string, any>>
    ) => Response<any, Record<string, any>>
  ) {
    throw new Error("Method not implemented.");
  }
  public async checkUser(req: Request, res: Response, next: NextFunction) {
    try {
      const authorization = req.headers.authorization;

      if (!authorization) {
        return res
          .status(401)
          .send({ success: false, message: "Verifique login ou senha" });
      }
      const token = authorization.split(" ")[1];

      const verify = jwtService.verifyToken(token) as UserPayload;

      req.authUser = {
        id: verify?.id,
        name: verify?.name,
        email: verify?.email,
        username: verify?.username,
        avatar: verify?.avatar,
        password: verify?.password,
        enable: verify?.enable,
        iat: verify?.iat,
      };

      next();
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: "Verifique login ou senha",
        error,
      });
    }
  }
}
export default AuthMiddleware;
