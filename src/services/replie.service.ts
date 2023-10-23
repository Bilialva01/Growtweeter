import { Replie as RepliePrisma } from "@prisma/client";
import prisma from "../database/prisma.database";
import {
  CreateReplieDto,
  FoundReplieDto,
  UpdateReplieDto,
} from "../dtos/replie.dto";
import { ResponseDto } from "../dtos/response.dto";
import { Replie } from "../models/replie";

class ReplieService {
  public async create(data: CreateReplieDto): Promise<ResponseDto> {
    const createdReplie = await prisma.replie.create({
      data: {
        idUserReplie: data.idUser,
        content: data.content,
        idTweetBase: data.idTweetBase,
      },
    });

    return {
      code: 201,
      message: "Replie created sucessfully",
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

    const replieEncontrado = await prisma.replie.findMany({
      where: {
        id: idUser,
      },
    });
    if (!replieEncontrado) {
      return {
        code: 404,
        message: "Replie not found",
      };
    }
    return {
      code: 200,
      message: " Replie succesfully listed",
      data: replieEncontrado,
    };
  }
  public async update(data: UpdateReplieDto): Promise<ResponseDto> {
    const replie = await prisma.replie.findUnique({
      where: {
        id: data.idReplie,
        content: data.content,
      },
    });
    if (!replie) {
      return {
        code: 404,
        message: "Replie not found",
      };
    }

    const atualizarReplie = await prisma.replie.update({
      where: {
        id: data.idReplie,
      },
      data: {
        content: data.content,
      },
    });

    return {
      code: 200,
      message: "Replie updated succesfully",
      data: this.mapToModel(atualizarReplie).toJson(),
    };
  }

  public async delete(data: FoundReplieDto): Promise<ResponseDto> {
    const replieEncontrado = await prisma.replie.findUnique({
      where: {
        id: data.idReplie,
      },
    });

    if (!replieEncontrado) {
      return {
        code: 404,
        message: " Replie not found",
      };
    }

    // 2- deletar o Replie
    const deleted = await prisma.replie.delete({
      where: {
        id: data.idReplie,
      },
    });

    return {
      code: 200,
      message: "Replie successfully deleted",
      data: this.mapToModel(deleted).toJson(),
    };
  }

  public mapToModel(replie: RepliePrisma): Replie {
    const model = new Replie(
      replie.id,
      replie.idUserReplie,
      replie.content,
      replie.idTweetBase
    );

    return model;
  }
}
export default new ReplieService();
