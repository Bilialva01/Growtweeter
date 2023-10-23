import { Request, Response } from "express";
import likeService from "../services/like.service";

export class LikeController {
  public async list(req: Request, res: Response) {
    try {
      const { idUser } = req.body;

      const result = await likeService.listByIdUser(idUser);

      return res.status(result.code).send(result);
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const { idUser, idTweet, like } = req.body;

      const response = await likeService.create({
        idUser,
        idTweet,
        like,
      });
      return res.status(response.code).send(response);
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
  public async update(req: Request, res: Response) {
    try {
      const { idLike } = req.params;
      const { idUser, like } = req.body;

      const result = await likeService.update({
        idLike,
        idUser,
        like,
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
      const { idUser } = req.body;
      const { idLike } = req.params;

      const response = await likeService.delete({ idUser, idLike });

      return res.status(response.code).send(response);
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
