import { Request, Response } from "express";
import userService from "../services/user.service";

export class UserController {
  public async list(req: Request, res: Response) {
    const result = await userService.listAll();
    return res.status(result.code).send(result);
  }
  public async create(req: Request, res: Response) {
    try {
      const { name, email, username, password } = req.body;

      const result = await userService.create({
        name,
        email,
        username,
        password,
      });

      return res.status(201).send({
        ok: true,
        message: "User succesfully created ",
        data: result,
      });
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await userService.delete(id);

      return res.status(result.code).send(result);
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, username, password, enable } = req.body;

      const result = await userService.update({
        id,
        name,
        email,
        username,
        password,
        enable,
      });

      return res.status(result.code).send(result);
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
