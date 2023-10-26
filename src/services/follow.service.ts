import { ResponseDto } from "../dtos/response.dto";
import prisma from "../database/prisma.database";
import { FoundFollowDTO } from "../dtos/follow.dto";

class FollowService {
  //seguir um usuario
  public async followUser(data: FoundFollowDTO): Promise<ResponseDto> {
    await prisma.follower.create({
      data: {
        idUser: data.idUser,
        idUserFollower: data.idUserFollower,
      },
    });
    return {
      code: 200,
      message: "following successfully",
    };
  }

  public async unfollowUser(data: FoundFollowDTO): Promise<ResponseDto> {
    //idUser vai ser o usuario que vai deixar de seguir e o idUserToFollow será o usuario que perderá um seguidor

    // Verificar se o usuário está seguindo o usuário alvo
    const existingFollowing = await prisma.following.findFirst({
      where: {
        idUserFollowing: data.idUserFollower,
      },
    });

    if (!existingFollowing) {
      return {
        code: 404,
        message: "Following not found",
      };
    }
    // Excluir o registro da tabela de Following(deixar de seguir)
    await prisma.following.delete({
      where: {
        id: existingFollowing.id,
      },
    });
    return {
      code: 200,
      message: "unfollowing successfully",
    };
  }

  public async listFollowings(idUser: string): Promise<ResponseDto> {
    // listar quem sigo
    const following = await prisma.following.findMany({
      where: {
        idUser: idUser,
      },
    });
    return {
      code: 200,
      message: "Followings successfully listed",
      data: following,
    };
  }
}

export default new FollowService();
