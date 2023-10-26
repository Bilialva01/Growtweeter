import { Request, Response } from "express";
import followService from "../services/follow.service";
import { FoundFollowDTO } from "../dtos/follow.dto";

export class FollowController {
  //seguir um user
  public async followUser(req: Request, res: Response) {
    try {
      const { idUser, idUserFollower } = req.body as FoundFollowDTO;

      const result = await followService.followUser({ idUser, idUserFollower });

      return res.status(200).send({
        ok: true,
        message: "User followed successfully",
        data: result,
      });
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
  //deixar de seguir um user
  public async unfollowUser(req: Request, res: Response) {
    try {
      const { idUser, idUserFollower } = req.body as FoundFollowDTO;

      const result = await followService.unfollowUser({
        idUser,
        idUserFollower,
      });

      return res.status(200).send({
        ok: true,
        message: "User unfollowed successfully",
        data: result,
      });
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
  //listar quem eu sigo
  public async listFollowings(req: Request, res: Response) {
    try {
      const { idUser } = req.body;

      const followings = await followService.listFollowings(idUser);

      return res.status(200).send({
        ok: true,
        message: "Followings listed successfully",
        data: followings,
      });
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
