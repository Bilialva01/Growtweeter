import { Request, Response } from "express";
import tweetService from "../services/tweet.service";

export class TweetController {
  public async list(req: Request, res: Response) {
    try {
      const { idUser } = req.body;

      const result = await tweetService.listByIdUser(idUser);

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
      const { idUser, content } = req.body;

      const result = await tweetService.create({
        idUser,
        content,
      });

      return res.status(201).send({
        ok: true,
        message: "Tweet succesfully created ",
        data: result,
      });
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { idTweet } = req.params;
      const { content } = req.body;

      const result = await tweetService.update({
        idTweet,
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
      const { idTweet } = req.params;
      const { idUser } = req.body;

      const result = await tweetService.delete({ idTweet, idUser });

      return res.status(result.code).send(result);
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
