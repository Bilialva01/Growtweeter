import { Like as LikePrisma } from "@prisma/client";
import prisma from "../database/prisma.database";
import { CreateLikeDto, FoundLikeDTO, UpdateLikeDto } from "../dtos/like.dto";
import { ResponseDto } from "../dtos/response.dto";
import { Like } from "../models/like";

class LikeService {
  public async create(data: CreateLikeDto): Promise<ResponseDto> {
    const criacaolike = await prisma.like.create({
      data: {
        idUser: data.idUser,
        idTweet: data.idTweet,
        like: data.like,
      },
    });

    return {
      code: 201,
      message: " Like Successfully listed",
      data: this.mapToModel(criacaolike).toJson(),
    };
  }

  public async listByIdUser(idUser: string): Promise<ResponseDto> {
    // 1- validar se o user existe
    const user = await prisma.user.findUnique({
      where: {
        id: idUser,
      },
    });

    if (!user) {
      return {
        code: 404,
        message: "User not found",
      };
    }

    // 2- listar os likes do user
    const likes = await prisma.like.findMany({
      where: {
        idUser,
      },
    });
    const likesModel = likes.map((item) => this.mapToModel(item));

    return {
      code: 200,
      message: "Likes successfully listed",
      data: likesModel.map((item) => item.toJson()),
    };
  }

  public async update(data: UpdateLikeDto): Promise<ResponseDto> {
    const like = await prisma.like.findUnique({
      where: {
        id: data.idLike,
        idUser: data.idUser,
      },
    });
    if (!like) {
      return {
        code: 404,
        message: "like not found",
      };
    }

    const atualizarlike = await prisma.like.update({
      where: {
        id: data.idLike,
        idUser: data.idUser,
      },
      data: {
        like: data.like,
      },
    });

    return {
      code: 200,
      message: "Like updated succesfully",
      data: atualizarlike,
    };
  }
  public async delete(data: FoundLikeDTO): Promise<ResponseDto> {
    const like = await prisma.like.findUnique({
      where: {
        id: data.idLike,
        idUser: data.idUser,
      },
    });

    if (!like) {
      return {
        code: 404,
        message: "like not found",
      };
    }
    const deleted = await prisma.like.delete({
      where: { id: data.idLike, idUser: data.idUser },
    });
    return {
      code: 200,
      message: "like successfully deleted",
      data: this.mapToModel(deleted).toJson(),
    };
  }
  public mapToModel(like: LikePrisma): Like {
    const model = new Like(like.id, like.idTweet, like.idUser, like.like);

    return model;
  }
}
export default new LikeService();
