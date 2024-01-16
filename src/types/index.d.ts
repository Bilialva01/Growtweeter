import { Request } from "express";
export declare module "express-serve-static-core" {
  interface Request {
    authUser: {
      id: string;
      name: string;
      email: string;
      username: string;
      password: string;
      avatar: string;
      enable: boolean;
      iat: number;
    };
  }
}
