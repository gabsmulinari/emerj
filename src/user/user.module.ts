import { Module } from '@nestjs/common';
import { UtilsService } from '../utils/utils.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, UtilsService],
})
export class UserModule {}
