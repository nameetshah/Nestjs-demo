import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class LoginService {
  async findOne(username: string): Promise<User | undefined> {
    return prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  }

  async updateUser(
    id: number,
    isLogin: boolean,
    login: Date,
  ): Promise<User | undefined> {
    return prisma.user.update({
      where: {
        id,
      },
      data: {
        isLogin,
        login,
      },
    });
  }
}
