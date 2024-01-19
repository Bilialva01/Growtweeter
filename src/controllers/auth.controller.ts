
import userService from "../services/user.service";
import jwtService from "../services/jwt.service";
import authService from "../services/auth.service";
import { Request, Response } from "express";


class AuthController {
  public async login(req: Request, res: Response) {
    const data = req.body;

    const user = await userService.findByUsername(data.username);

    if (!user) {
      return res.status(401).send({ message: "Username or password wrong" });
    }
    const checkPassword = await authService.comparePassword(
      data.password,
      user.password
    );

    if (!checkPassword) {
      return res
        .status(401)
        .send({ success: false, message: "Username or password wrong" });
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      enable: user.enable,
    };
    const token = jwtService.createToken(payload);

    return res.status(200).send({
      success: true,
      message: "Login succesfully",
      data: { token, user: payload }
    });
  }

  public async logout(req: Request, res: Response) {
    try {
      const { id } = req.authUser;

      const result= await authService.delete(id);

      return res.status(result.code).send(result.message);
      
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}

export default AuthController;
