import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User as UserModel, Prisma } from '@prisma/client';
import { UtilsService } from 'src/utils/utils.service';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDTO } from './dto/editUser.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private utils: UtilsService) {}

  async getUsers(): Promise<UserModel[]> {
    return this.prisma.user.findMany({});
  }
  async getUserById(id: number): Promise<UserModel> {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<UserModel> {
    const user = await this.prisma.user.create({ data });
    if (user) {
      const send = await this.utils.sendMail(user.email, 'EMERJ - BEM VINDO');
    } else {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Falha ao cadastrar usuário',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return user;
  }

  async updateUser(userData: EditUserDTO): Promise<UserModel> {
    const { name, email, password, userId } = userData;
    return this.prisma.user.update({
      where: {
        id: +userId,
      },
      data: { name, email, password },
    });
  }

  async deleteUser(userId: number): Promise<UserModel> {
    return this.prisma.user.delete({
      where: { id: +userId },
    });
  }
}
