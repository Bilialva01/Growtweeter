import { Request, Response } from "express";
import userService from "../services/user.service";
import { UserResponse } from "../dtos/user.dto";

export class UserController {
  public async index(req: Request, res: Response) {
    const users = await userService.findAll();

    return res
      .status(200)
      .send({ success: true, message: "List of users", data: { users } });
  }

  public async create(req: Request, res: Response) {
    const { body } = req;
    // let avatar = null;

    // if (req.file) {
    //   avatar = `${process.env.API_URL}/${req.file.path}`;
    // }

    const newUser = await userService.create(body);
    if (newUser) {
      return res.status(201).send({
        ok: true,
        message: "User succesfully created ",
        data: newUser.toJson(),
      });
    }

    res.status(500).send({
      ok: false,
      message: "Erro ao criar Usuário",
    });
  }
  public async list(req: Request, res: Response) {
    const { id } = req.params;

    const user = await userService.findById(id);

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }
    const userData: UserResponse = {
      id: user.id,
      username: user.username,
      enable: user.enable,
      createdAt: user.createdAt,
      tweets: user.tweet,
    };

    return res.status(200).send({
      success: true,
      message: "Listagem de usuário",
      data: { user: userData },
    });
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, username, avatar, password, enable } = req.body;

      const result = await userService.update({
        id,
        name,
        email,
        username,
        avatar,
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
}
