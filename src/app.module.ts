import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { CursosModule } from './cursos/cursos.module';
import { AuthModule } from './auth/auth.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [UserModule, CursosModule, AuthModule, UtilsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
