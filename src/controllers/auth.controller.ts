import { Request, Response } from "express";
import userService from "../services/user.service";
import jwtService from "../services/jwt.service";
import { ResponseDto } from "../dtos/response.dto";
import { v4 as tokenGenerate } from "uuid";
import authService from "../services/auth.service";

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
      data: { token, user: payload },
    });
  }

  public logout(req: Request, res: Response) {
    console.log("logout");

    return res
      .status(200)
      .send({ success: true, message: "Logout succesfully" });
  }
}

export default AuthController;
