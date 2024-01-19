import { compare } from "bcrypt";
import { ResponseDto } from "../dtos/response.dto";
import prisma from "../database/prisma.database";


class AuthService {
  public async comparePassword(password: string, hash: string) {
    return await compare(password, hash);
  }
  public async delete(id:string): Promise<ResponseDto>{
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return {
       code:404,
       message:"User not found"
      }
    }
    return {
      code: 200,
      message: "Logout succesfully",
    }
  }
}
export default new AuthService();
