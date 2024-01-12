import prisma from "../database/prisma.database";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import { ResponseDto } from "../dtos/response.dto";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";

class UserService {
  public async findAll(): Promise<any> {
    const data = await prisma.user.findMany({
      include: {
        tweet: true,
        reTweet: true,
      },
    });

    return data;
  }

  public async create(data: CreateUserDto) {
    const passwordHash = await bcrypt.hash(data.password, 10);

    const newUser = new User(
      data.name,
      data.email,
      data.username,
      passwordHash
    );

    const criacaoUser = await prisma.user.create({
      data: {
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        password: newUser.password,
        enable: newUser.enable,
        avatar: data.avatar,
        id: newUser.id,
      },
    });
    return newUser;
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
  public async findByUsername(username: string) {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    return user;
  }
  public async findById(id: string) {
    const user = prisma.user.findUnique({
      where: { id },
      include: {
        tweet: true,
        reTweet: true,
      },
    });

    return user;
  }
}
export default new UserService();
