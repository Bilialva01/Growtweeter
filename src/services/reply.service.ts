import { Reply as ReplyPrisma } from "@prisma/client";
import prisma from "../database/prisma.database";
import {
  CreateReplyDto,
  FoundReplyDto,
  UpdateReplyDto,
} from "../dtos/reply.dto";
import { ResponseDto } from "../dtos/response.dto";
import { Reply } from "../models/reply";

class ReplyService {
  public async create(data: CreateReplyDto): Promise<ResponseDto> {
    const createdReply= await prisma.reply.create({
      data: {
        idUserReply: data.idUser,
        content: data.content,
        idTweetBase: data.idTweetBase,
      },
    });

    return {
      code: 201,
      message: "Replie created sucessfully",
      data: this.mapToModel(createdReply).toJson(),
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

    const replyEncontrado = await prisma.reply.findMany({
      where: {
        id: idUser,
      },
    });
    if (!replyEncontrado) {
      return {
        code: 404,
        message: "Reply not found",
      };
    }
    return {
      code: 200,
      message: " Reply succesfully listed",
      data: replyEncontrado,
    };
  }
  public async update(data: UpdateReplyDto): Promise<ResponseDto> {
    const replie = await prisma.reply.findUnique({
      where: {
        id: data.idReply,
        content: data.content,
      },
    });
    if (!replie) {
      return {
        code: 404,
        message: "Reply not found",
      };
    }

    const atualizarReply = await prisma.reply.update({
      where: {
        id: data.idReply,
      },
      data: {
        content: data.content,
      },
    });

    return {
      code: 200,
      message: "Reply updated succesfully",
      data: this.mapToModel(atualizarReply).toJson(),
    };
  }

  public async delete(data: FoundReplyDto): Promise<ResponseDto> {
    const replyEncontrado = await prisma.reply.findUnique({
      where: {
        id: data.idReply,
      },
    });

    if (!replyEncontrado) {
      return {
        code: 404,
        message: " Reply not found",
      };
    }

    // 2- deletar o Reply
    const deleted = await prisma.reply.delete({
      where: {
        id: data.idReply,
      },
    });

    return {
      code: 200,
      message: "Reply successfully deleted",
      data: this.mapToModel(deleted).toJson(),
    };
  }

  public mapToModel(reply: ReplyPrisma): Reply {
    const model = new Reply(
      reply.id,
      reply.idUserReply,
      reply.content,
      reply.idTweetBase
    );

    return model;
  }
}
export default new ReplyService();
