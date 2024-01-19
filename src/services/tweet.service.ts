import { TweetBase as TweetBasePrisma } from "@prisma/client";
import { ResponseDto } from "../dtos/response.dto";
import {
  CreateTweetDto,
  FoundTweetDto,
  UpdateTweetDto,
} from "../dtos/tweet.dto";
import { TweetBase } from "../models/tweetBase";
import prisma from "../database/prisma.database";

class TweetService {
  public async findAll(): Promise<any> {
    const data = await prisma.tweetBase.findMany({});

    return data;
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

    // 2- listar os tweets do user
    const tweets = await prisma.tweetBase.findMany({
      where: {
        idUser,
      },
    });

    return {
      code: 200,
      message: "Tweets successfully listed",
      data: tweets,
    };
  }
  public async create(data: CreateTweetDto): Promise<ResponseDto> {
    const criacaoTweet = await prisma.tweetBase.create({
      data: {
        idUser: data.idUser,
        content: data.content,
      },
    });

    return {
      code: 201,
      message: "Tweet created sucessfully",
      data: this.mapToModel(criacaoTweet).toJson(),
    };
  }

  public async update(data: UpdateTweetDto): Promise<ResponseDto> {
    const tweetEncontrado = await prisma.tweetBase.findUnique({
      where: {
        id: data.idTweet,
      },
    });
    if (!tweetEncontrado) {
      return {
        code: 404,
        message: "Tweet not found",
      };
    }

    const atualizarTweet = await prisma.tweetBase.update({
      where: {
        id: data.idTweet,
      },
      data: {
        content: data.content,
      },
    });

    return {
      code: 200,
      message: "Tweet updated succesfully",
      data: this.mapToModel(atualizarTweet).toJson(),
    };
  }
  public async delete(data: FoundTweetDto): Promise<ResponseDto> {
    const tweetEncontrado = await prisma.tweetBase.findUnique({
      where: {
        id: data.idTweet,
      },
    });

    if (!tweetEncontrado) {
      return {
        code: 404,
        message: "Tweet not found",
      };
    }
    await prisma.tweetBase.delete({
      where: {
        id: data.idTweet,
      },
    });

    return {
      code: 200,
      message: "Tweet successfully deleted",
    };
  }
  public async findById(id: string) {
    const tweet = prisma.tweetBase.findUnique({ where: { id } });

    return tweet;
  }
  public mapToModel(tweet: TweetBasePrisma): TweetBase {
    const model = new TweetBase(tweet.id, tweet.idUser, tweet.content);

    return model;
  }
}
export default new TweetService();
