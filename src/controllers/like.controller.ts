import { Request, Response } from "express";
import likeService from "../services/like.service";

export class LikeController {

  public async create(req: Request, res: Response) {
    try {
      const {id}= req.authUser
      const { idTweet, idRetweet,idReply } = req.body;

      const response = await likeService.create({
        idUser:id,
        idTweet,
        idRetweet,
        idReply
      });
      return res.status(response.code).send(response);
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
  
  public async delete(req: Request, res: Response) {
    try {
      const { idLike } = req.params;
      const { idUser } = req.body;

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
