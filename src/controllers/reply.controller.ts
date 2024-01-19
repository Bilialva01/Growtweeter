import { Request, Response } from "express";
import replyService from "../services/reply.service";

export class ReplyController {
  public async create(req: Request, res: Response) {
    try {
      const { idUser, idTweetBase, content } = req.body;

      const result = await replyService.create({
        idUser,
        idTweetBase,
        content,
      });

      return res.status(result.code).send(result);
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
  public async list(req: Request, res: Response) {
    try {
      const { idUser } = req.body;

      const response = await replyService.listByIdUser(idUser);

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
      const { idReply } = req.params;
      const { idUser, content } = req.body;

      const result = await replyService.update({
        idUser,
        idReply,
        content,
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
      const { idReply } = req.params;
      const { idUser } = req.body;

      const result = await replyService.delete({ idUser, idReply });

      return res.status(result.code).send(result);
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
