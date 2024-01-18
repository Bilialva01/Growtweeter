import { Request, Response } from "express";
import retweetService from "../services/retweet.service";

class RetweetController {
  public async index(req: Request, res: Response) {
    const retweets = await retweetService.findAll();

    return res
      .status(200)
      .send({ success: true, message: "List of retweets", data: { retweets } });
  }

  public async create(req: Request, res: Response) {
    try {
      const { idUser, idTweetBase, content } = req.body;

      const result = await retweetService.create({
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

      const response = await retweetService.listByIdUser(idUser);

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
      const { idRetweet } = req.params;
      const { idUser, content } = req.body;

      const result = await retweetService.update({
        idUser,
        idRetweet,
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
      const { idRetweet } = req.params;
      const { idUser } = req.body;

      const result = await retweetService.delete({ idUser, idRetweet });

      return res.status(result.code).send(result);
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
export default RetweetController;
