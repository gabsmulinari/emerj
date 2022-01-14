import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CursosController } from './cursos.controller';
import { CursosService } from './cursos.service';

@Module({
  controllers: [CursosController],
  providers: [CursosService, PrismaService],
})
export class CursosModule {}
