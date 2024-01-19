
import prisma from "../database/prisma.database";
import { CreateLikeDto, FoundLikeDTO } from "../dtos/like.dto";
import { ResponseDto } from "../dtos/response.dto";


class LikeService {
  public async create(data: CreateLikeDto): Promise<ResponseDto> {
    const user = await prisma.user.findUnique({
      where: {
        id: data.idUser,
      }, 
    });

    if (!user) {
      return {
        code: 404,
        message: "User not found",
      };
    }
if (data.idTweet) {
  const exist = await prisma.tweetBase.findUnique({
    where:{
      id: data.idTweet,
     }
  });
  if (!exist) {
    return {
      code: 404,
      message: "Tweet not found",
    };
  }
}
if (data.idRetweet) {
  const exist = await prisma.retweet.findUnique({
    where:{
      id: data.idRetweet,
     }
  });
  if (!exist) {
    return {
      code: 404,
      message: "ReTweet not found",
    };
  }
}
if (data.idReply) {
  const exist = await prisma.reply.findUnique({
    where:{
      id: data.idReply,
     }
  });
  if (!exist) {
    return {
      code: 404,
      message: "Reply not found",
    };
  }
}
       await prisma.like.create({
        data: {
          idUser: user.id,
          idTweet: data.idTweet,
          idRetweet:data.idRetweet,
          idReply: data.idReply,
        },
      });
      return {
        code: 201,
        message: " Like Successfully created",
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
    await prisma.like.delete({
      where: { id: data.idLike, idUser: data.idUser },
    });
    return {
      code: 200,
      message: "like successfully deleted",
    };
  }
 
}
export default new LikeService();
