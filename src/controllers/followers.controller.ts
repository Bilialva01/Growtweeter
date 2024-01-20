import { Request, Response } from "express";
import followerService from "../services/follower.service";

export class FollowerController {
  //lista os seguidores de um user
  public async listFollowers(req: Request, res: Response) {
    try {
      const { id } = req.authUser;

      const followers = await followerService.list(id);

      return res.status(200).send({
        ok: true,
        message: "Followers listed successfully",
        data: followers,
      });
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
