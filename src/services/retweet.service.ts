import { Retweet as RetweetPrisma } from "@prisma/client";
import prisma from "../database/prisma.database";
import {
  CreateRetweetDto,
  FoundRetweetDto,
  UpdateRetweetDto,
} from "../dtos/retweet.dto";
import { ResponseDto } from "../dtos/response.dto";
import { Retweet } from "../models/retweet";

class RetweetService {
  public async create(data: CreateRetweetDto): Promise<ResponseDto> {
    const createdReplie = await prisma.retweet.create({
      data: {
        idUserRetweet: data.idUser,
        content: data.content,
        idTweetBase: data.idTweetBase,
      },
    });

    return {
      code: 201,
      message: "Retweet created sucessfully",
      data: this.mapToModel(createdReplie).toJson(),
    };
  }
  public async listByIdUser(idUser: string): Promise<ResponseDto> {
    const user = await prisma.user.findMany({
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

    const retweetEncontrado = await prisma.retweet.findMany({
      where: {
        id: idUser,
      },
    });
    if (!retweetEncontrado) {
      return {
        code: 404,
        message: "Retweet not found",
      };
    }
    return {
      code: 200,
      message: " Retweet succesfully listed",
      data: retweetEncontrado,
    };
  }
  public async update(data: UpdateRetweetDto): Promise<ResponseDto> {
    const retweet = await prisma.retweet.findUnique({
      where: {
        id: data.idRetweet,
        content: data.content,
      },
    });
    if (!retweet) {
      return {
        code: 404,
        message: "Retweet not found",
      };
    }

    const atualizarRetweet = await prisma.retweet.update({
      where: {
        id: data.idRetweet,
      },
      data: {
        content: data.content,
      },
    });

    return {
      code: 200,
      message: "Retweet updated succesfully",
      data: this.mapToModel(atualizarRetweet).toJson(),
    };
  }

  public async delete(data: FoundRetweetDto): Promise<ResponseDto> {
    const retweetEncontrado = await prisma.retweet.findUnique({
      where: {
        id: data.idRetweet,
      },
    });

    if (!retweetEncontrado) {
      return {
        code: 404,
        message: " Retweet not found",
      };
    }

    // 2- deletar o Retweet
    const deleted = await prisma.retweet.delete({
      where: {
        id: data.idRetweet,
      },
    });

    return {
      code: 200,
      message: "Retweet successfully deleted",
      data: this.mapToModel(deleted).toJson(),
    };
  }

  public mapToModel(replie: RetweetPrisma): Retweet {
    const model = new Retweet(
      replie.id,
      replie.idUserRetweet,
      replie.content,
      replie.idTweetBase
    );

    return model;
  }
}
export default new RetweetService();
