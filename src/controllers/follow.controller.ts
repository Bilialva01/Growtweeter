import { Request, Response } from "express";
import followService from "../services/follow.service";
import { FoundFollowDTO } from "../dtos/follow.dto";

export class FollowController {
  public async followUser(req: Request, res: Response) {
    try {
      const { idUser } = req.params;
      const { idUserFollower } = req.body as FoundFollowDTO;

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

  public async unfollowUser(req: Request, res: Response) {
    try {
      const { idUser } = req.params;
      const { idUserFollower } = req.body as FoundFollowDTO;

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
  public async listFollowers(req: Request, res: Response) {
    try {
      const { idUser } = req.params;

      const followers = await followService.listFollowers(idUser);

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
  public async listFollowings(req: Request, res: Response) {
    try {
      const { idUser } = req.params;

      const followings = await followService.listFollowers(idUser);

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
