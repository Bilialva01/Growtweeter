import prisma from "../database/prisma.database";
import { User } from "../models/user.model";
import { ResponseDto } from "../dtos/response.dto";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";

class UserService {
  public async listAll(): Promise<ResponseDto> {
    const data = await prisma.user.findMany();
    return {
      code: 200,
      message: " users successfully listed",
      data,
    };
  }
  public async getByDataUser(username: string, password: string) {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
        password: password,
      },
    });

    return user;
  }
  public async getByToken(token: string) {
    const user = await prisma.user.findUnique({
      where: {
        token: token,
      },
    });

    return user;
  }

  public async create(data: CreateUserDto) {
    const user = new User(data.name, data.email, data.username, data.password);

    const criacaoUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        username: user.username,
        password: user.password,
        id: user.id,
      },
    });
    return criacaoUser;
  }

  public async update(data: UpdateUserDto): Promise<ResponseDto> {
    const user = await prisma.user.findUnique({
      where: {
        id: data.id,
      },
    });
    if (!user) {
      return {
        code: 404,
        message: "User not found",
      };
    }

    const atualizarUser = await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        email: data.email,
        username: data.username,
        password: data.password,
        token: data.token,
      },
    });

    return {
      code: 200,
      message: "User updated succesfully",
      data: atualizarUser,
    };
  }

  public async delete(id: string): Promise<ResponseDto> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return {
        code: 404,
        message: "User not found",
      };
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return {
      code: 200,
      message: "User successfully deleted",
    };
  }
}
export default new UserService();
