import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CursosService } from './cursos.service';
import { Cursos as CursosModel } from '@prisma/client';
import { CreateCursosDTO } from './dto/createCursos.dto';
import { EditCursosDTO } from './dto/editCursos.dto';

@Controller('cursos')
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Get()
  async getCursos(): Promise<CursosModel[]> {
    return this.cursosService.getCursos();
  }
  @Get(':id')
  async getCursosById(@Param(':id') id: number): Promise<CursosModel> {
    return this.cursosService.getCursosById(id);
  }
  @Post()
  async createCursos(@Body() userData: CreateCursosDTO): Promise<CursosModel> {
    return this.cursosService.createCursos(userData);
  }
  @Delete(':id')
  async deleteCursos(@Param('id') cursosId: number): Promise<CursosModel> {
    return this.cursosService.deleteCursos(cursosId);
  }
  @Put(':id')
  async updateCursos(
    @Param('id') cursosId: number,
    @Body() cursosData: EditCursosDTO,
  ): Promise<CursosModel> {
    cursosData.cursosId = cursosId;
    return this.cursosService.updateCursos(cursosData);
  }
}
