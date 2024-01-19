import { Request, Response } from "express";
import tweetService from "../services/tweet.service";

class TweetController {
  public async index(req: Request, res: Response) {
    const tweets = await tweetService.findAll();

    return res
      .status(200)
      .send({ success: true, message: "List of tweets", data: { tweets } });
  }

  public async create(req: Request, res: Response) {
    const idUser = req.authUser.id;
    const { content } = req.body;

    if (!content) {
      return res.status(400).send({
        success: false,
        message: " Content camp requered",
      });
    }
    const tweet = await tweetService.create({
      idUser: idUser,
      content,
    });

    return res.status(201).send({
      ok: true,
      message: "Tweet succesfully created ",
      data: { tweet },
    });
  }

  public async list(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await tweetService.findById(id);

      return res.status(200).send({
        success: true,
        message: "Tweet succesfuly listed",
        data: { result },
      });
    } catch (error: any) {
      return res.status(404).send({
        success: false,
        message: "Tweet not found",
        data: { error },
      });
    }
  }
  public async update(req: Request, res: Response) {
    const { idTweet } = req.params;
    const {id}= req.authUser
    const { content } = req.body;
    try {
      const result = await tweetService.update({
        idUser:id,
        idTweet,
        content,
      });

      return res.status(200).send({
        success: true,
        message: "Tweet succesfully updated",
        data: { tweet: result },
      });
    } catch (error: any) {
      return res.status(400).send({
        success: false,
        message: "Erro ao atualizar Tweet",
        data: { error },
      });
    }
  }

  public async delete(req: Request, res: Response) {
    const { idTweet } = req.params;
    const {id}= req.authUser

    try {
      const result = await tweetService.delete({ idTweet, idUser:id });

      return res.status(200).send({
        success: true,
        message: "Tweet succesfully deleted",
        data: { tweet: result },
      });
    } catch (error: any) {
      return res.status(400).send({
        success: false,
        message: "Erro ao deletar Tweet",
        data: { error },
      });
    }
  }
}
export default TweetController;
