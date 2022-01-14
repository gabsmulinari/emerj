import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cursos as CursosModel, Prisma } from '@prisma/client';
import { EditCursosDTO } from './dto/editCursos.dto';

@Injectable()
export class CursosService {
  constructor(private prisma: PrismaService) {}

  async getCursos(): Promise<CursosModel[]> {
    return this.prisma.cursos.findMany({});
  }

  async createCursos(data: Prisma.CursosCreateInput): Promise<CursosModel> {
    return this.prisma.cursos.create({ data });
  }

  async getCursosById(id: number): Promise<CursosModel> {
    return this.prisma.cursos.findFirst({ where: { id } });
  }

  async deleteCursos(cursosId: number): Promise<CursosModel> {
    return this.prisma.cursos.delete({
      where: { id: +cursosId },
    });
  }

  async updateCursos(cursosData: EditCursosDTO): Promise<CursosModel> {
    const { cursosId, nome, descricao, tipo } = cursosData;
    return this.prisma.cursos.update({
      where: { id: +cursosId },
      data: { nome, descricao, tipo },
    });
  }
}
