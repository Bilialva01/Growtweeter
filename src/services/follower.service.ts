import { ResponseDto } from "../dtos/response.dto";
import prisma from "../database/prisma.database";

class FollowerService {
  public async list(idUser: string): Promise<ResponseDto> {
    // listar seguidores
    const followers = await prisma.follower.findMany({
      where: {
        idUser: idUser,
      },
    });
    return {
      code: 200,
      message: "Followers successfully listed",
      data: followers,
    };
  }
}
export default new FollowerService();
