import { Request, Response } from "express";
import replieService from "../services/replie.service";

export class ReplieController {
  public async create(req: Request, res: Response) {
    try {
      const { idUser, idTweetBase, content } = req.body;

      const result = await replieService.create({
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

      const response = await replieService.listByIdUser(idUser);

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
      const { idReplie } = req.params;
      const { idUser, content } = req.body;

      const result = await replieService.update({
        idUser,
        idReplie,
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
      const { idReplie } = req.params;
      const { idUser } = req.body;

      const result = await replieService.delete({ idUser, idReplie });

      return res.status(result.code).send(result);
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
